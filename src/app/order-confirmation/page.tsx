import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface ShippingAddress {
  firstName?: string;
  lastName?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string }>;
}) {
  const { order: orderNumber, email } = await searchParams;

  // Require both order number AND the email used at checkout to prevent IDOR
  // (anyone who guesses/brute-forces an order number cannot see someone else's order)
  const order =
    orderNumber && email
      ? await prisma.order.findFirst({
          where: {
            orderNumber,
            email: email.toLowerCase().trim(),
          },
          include: {
            items: {
              include: { product: true },
            },
          },
        })
      : null;

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <CheckCircle className="mb-6 h-16 w-16 text-gold" />
        <h1 className="font-serif text-4xl text-foreground">Order Confirmed!</h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <Link
          href="/watches"
          className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Continue Shopping
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  let address: ShippingAddress = {};
  try {
    address = JSON.parse(order.shippingAddress) as ShippingAddress;
  } catch {
    /* leave empty */
  }

  const images = order.items.map((item) => {
    try {
      const parsed = JSON.parse(item.product.images) as string[];
      return parsed[0] ?? "";
    } catch {
      return "";
    }
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      {/* Success header */}
      <div className="text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-gold" strokeWidth={1.5} />
        <span className="eyebrow">Order Confirmed</span>
        <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
          Thank you for your order.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          A confirmation has been sent to{" "}
          <span className="font-medium text-foreground">{order.email}</span>.
        </p>
        <div className="mt-5 inline-block border border-gold/30 bg-gold/5 px-6 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
            Order Number
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-gold">
            {order.orderNumber}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-14">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-4 w-4 text-stone" />
          <h2 className="font-serif text-xl text-foreground">Your Items</h2>
        </div>
        <div className="divide-y divide-hairline border border-hairline">
          {order.items.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              {images[idx] && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-hairline">
                  <Image
                    src={images[idx]}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="font-serif text-base text-foreground">{item.product.name}</p>
                <p className="mt-0.5 text-xs text-stone">Qty: {item.quantity}</p>
              </div>
              <p className="font-mono text-sm text-foreground">
                {formatPriceCents(item.priceAtPurchase * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="mt-6 border border-hairline p-5">
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-stone">Subtotal</span>
            <span className="font-mono">{formatPriceCents(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone">Shipping</span>
            <span className="font-mono text-gold">
              {order.shippingCents === 0 ? "Free" : formatPriceCents(order.shippingCents)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone">Tax</span>
            <span className="font-mono">{formatPriceCents(order.taxCents)}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <span className="font-serif text-lg font-semibold">Total</span>
          <span className="font-mono text-xl font-semibold text-foreground">
            {formatPriceCents(order.totalCents)}
          </span>
        </div>
      </div>

      {/* Shipping address */}
      {address.line1 && (
        <div className="mt-6 border border-hairline p-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Shipping Address
          </p>
          <p className="text-sm text-stone">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-sm text-stone">{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
          <p className="text-sm text-stone">
            {address.city}
            {address.region ? `, ${address.region}` : ""} {address.postalCode}
          </p>
          <p className="text-sm text-stone">{address.country}</p>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/watches"
          className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Continue Shopping
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 border border-hairline px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
}
