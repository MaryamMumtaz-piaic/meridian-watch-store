"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Lock, Minus, Plus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);

  const subtotal = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <ShoppingBag className="mb-6 h-16 w-16 text-stone/40" />
        <h1 className="font-serif text-3xl text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-sm text-stone">
          Discover our collection of fine mechanical watches.
        </p>
        <Link
          href="/watches"
          className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Discover Our Collection
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <span className="eyebrow">Your Cart</span>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
        Shopping Bag
        <span className="ml-3 font-sans text-base font-normal text-stone">
          ({items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* ── Cart Items ── */}
        <div>
          <ul className="divide-y divide-hairline">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-5 py-7 first:pt-0">
                {/* Image */}
                <Link
                  href={`/watches/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden border border-hairline bg-secondary transition-colors hover:border-gold"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/watches/${item.slug}`}
                        className="font-serif text-base font-semibold text-foreground transition-colors hover:text-gold"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 font-mono text-sm text-gold">
                        {formatPriceCents(item.priceCents)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 cursor-pointer text-stone/50 transition-colors hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {/* Qty control */}
                    <div className="flex items-center border border-hairline">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center text-stone transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center border-x border-hairline font-mono text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center text-stone transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {formatPriceCents(item.priceCents * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-hairline pt-6">
            <Link
              href="/watches"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="border border-hairline bg-secondary p-6">
            <h2 className="font-serif text-xl text-foreground">Order Summary</h2>

            <div className="mt-6 space-y-3 border-b border-hairline pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="font-mono">{formatPriceCents(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Shipping</span>
                <span className="font-mono text-gold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Tax (est. 8%)</span>
                <span className="font-mono">{formatPriceCents(tax)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-serif text-lg text-foreground">Total</span>
              <span className="font-mono text-xl font-semibold text-foreground">
                {formatPriceCents(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
            >
              Proceed to Checkout
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone">
              <Lock className="h-3 w-3" />
              <span>Secure, encrypted checkout</span>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 border-t border-hairline pt-5">
              {["VISA", "MC", "AMEX", "PayPal"].map((pm) => (
                <span
                  key={pm}
                  className="rounded border border-hairline px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-stone"
                >
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
