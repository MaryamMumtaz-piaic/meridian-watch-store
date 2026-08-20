"use server";

import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export async function createOrder(data: {
  email: string;
  shippingAddress: string; // JSON-stringified address object
  items: { productId: string; quantity: number }[];
}) {
  // --- Authoritative price lookup: never trust client-supplied prices ---
  const productIds = data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, priceCents: true, stock: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  // Validate all products exist and have stock
  for (const item of data.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return { error: `Product not found: ${item.productId}` };
    }
    if (product.stock < item.quantity) {
      return { error: `Insufficient stock for product: ${item.productId}` };
    }
  }

  // Compute totals server-side from authoritative DB prices
  const subtotalCents = data.items.reduce((sum, item) => {
    const product = productMap.get(item.productId)!;
    return sum + product.priceCents * item.quantity;
  }, 0);

  const shippingCents = 0; // Free shipping
  const taxCents = Math.round(subtotalCents * 0.08);
  const totalCents = subtotalCents + shippingCents + taxCents;

  // CSPRNG order number — not enumerable
  const orderNumber = `MT-${randomBytes(8).toString("hex").toUpperCase()}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      email: data.email,
      shippingAddress: data.shippingAddress,
      subtotalCents,
      shippingCents,
      taxCents,
      totalCents,
      // PENDING until a real payment provider (Stripe webhook) confirms the charge
      status: "PENDING",
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: productMap.get(item.productId)!.priceCents,
        })),
      },
    },
  });

  return { orderId: order.id, orderNumber: order.orderNumber };
}
