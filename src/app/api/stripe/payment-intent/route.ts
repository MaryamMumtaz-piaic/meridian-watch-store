import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-07-29.dahlia" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: { productId: string; quantity: number }[] = body.items ?? [];

    if (!items.length) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // Authoritative server-side price lookup
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
      select: { id: true, priceCents: true, stock: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalCents = 0;
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        console.error(`[payment-intent] Product not found: ${item.productId}. Found products: ${[...productMap.keys()].join(", ")}`);
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }
      if (product.stock < item.quantity)
        return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
      totalCents += product.priceCents * item.quantity;
    }

    const taxCents = Math.round(totalCents * 0.08);
    const amountCents = totalCents + taxCents;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe payment-intent error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
