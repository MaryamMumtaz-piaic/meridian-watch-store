"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculateTotals, SHIPPING_METHODS } from "@/lib/types";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  lines: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1),
  shipping: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    line1: z.string().min(3),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().optional(),
    postalCode: z.string().min(2),
    country: z.string().min(2),
    phone: z.string().optional(),
  }),
  shippingMethodId: z.enum(["insured", "express"]),
});

type PlaceOrderInput = z.infer<typeof schema>;

function generateOrderNumber() {
  const date = new Date();
  const datePart = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  // 80 bits of CSPRNG entropy — the order number doubles as the bearer token
  // for the guest order-confirmation lookup, so it must not be guessable.
  const token = randomBytes(10).toString("hex").toUpperCase();
  return `MER-${datePart}-${token}`;
}

export async function placeOrder(input: PlaceOrderInput) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(`placeOrder:${ip}`, 5, 10 * 60 * 1000)) {
    return {
      ok: false as const,
      message: "Too many orders placed recently. Please try again in a few minutes.",
    };
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, message: "Some details are missing or invalid." };
  }
  const { lines, shipping, shippingMethodId } = parsed.data;

  const products = await prisma.product.findMany({
    where: { id: { in: lines.map((l) => l.productId) } },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });

  const productById = new Map(products.map((p) => [p.id, p]));

  for (const line of lines) {
    const product = productById.get(line.productId);
    if (!product) {
      return { ok: false as const, message: "One of the items in your bag is no longer available." };
    }
    if (product.stock < line.quantity) {
      return {
        ok: false as const,
        message: `Only ${product.stock} of ${product.name} remain in stock.`,
      };
    }
  }

  const orderItems = lines.map((line) => {
    const product = productById.get(line.productId)!;
    return {
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      imageUrl: product.images[0]?.url ?? null,
      reference: product.reference,
      quantity: line.quantity,
      priceCents: product.priceCents,
      lineTotalCents: product.priceCents * line.quantity,
    };
  });

  const subtotalCents = orderItems.reduce((sum, i) => sum + i.lineTotalCents, 0);
  const shippingCents =
    SHIPPING_METHODS.find((m) => m.id === shippingMethodId)?.cents ?? 0;
  const totals = calculateTotals(subtotalCents, shippingCents);

  const orderNumber = generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        status: "PAID",
        email: shipping.email,
        customerName: shipping.fullName,
        shipLine1: shipping.line1,
        shipLine2: shipping.line2,
        shipCity: shipping.city,
        shipState: shipping.state,
        shipPostalCode: shipping.postalCode,
        shipCountry: shipping.country,
        shipPhone: shipping.phone,
        subtotalCents: totals.subtotalCents,
        shippingCents: totals.shippingCents,
        taxCents: totals.taxCents,
        totalCents: totals.totalCents,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    for (const line of lines) {
      await tx.product.update({
        where: { id: line.productId },
        data: { stock: { decrement: line.quantity } },
      });
    }

    return created;
  });

  await sendOrderConfirmationEmail({
    orderNumber: order.orderNumber,
    email: order.email,
    customerName: order.customerName,
    items: order.items,
    subtotalCents: order.subtotalCents,
    shippingCents: order.shippingCents,
    taxCents: order.taxCents,
    totalCents: order.totalCents,
  });

  return { ok: true as const, orderNumber: order.orderNumber };
}
