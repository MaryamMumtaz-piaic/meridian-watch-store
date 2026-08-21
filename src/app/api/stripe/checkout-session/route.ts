import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-07-29.dahlia" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: { productId: string; quantity: number }[] = body.items ?? [];
    const shipping: Record<string, string> = body.shipping ?? {};

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Server-side authoritative price lookup
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
      select: { id: true, name: true, priceCents: true, stock: true, images: true },
    });

    if (products.length !== items.length) {
      const foundIds = products.map((p) => p.id);
      const missing = items.filter((i) => !foundIds.includes(i.productId)).map((i) => i.productId);
      console.error("[checkout-session] Missing product IDs:", missing);
      return NextResponse.json(
        { error: "Some cart items are no longer available. Please refresh your cart." },
        { status: 400 }
      );
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const product = productMap.get(item.productId)!;
      const images = JSON.parse(product.images) as string[];

      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            ...(images[0]?.startsWith("http") ? { images: [images[0]] } : {}),
          },
        },
      };
    });

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      automatic_tax: { enabled: false },
      metadata: {
        shippingData: JSON.stringify(shipping),
        itemIds: items.map((i) => `${i.productId}:${i.quantity}`).join(","),
      },
      customer_email: shipping.email || undefined,
      billing_address_collection: "auto",
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout-session] Error:", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
