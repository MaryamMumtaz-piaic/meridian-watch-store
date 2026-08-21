"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  X,
  Lock,
  Minus,
  Plus,
  ArrowRight,
  Shield,
  RotateCcw,
  Award,
  Truck,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";

const SERVICES = [
  { icon: Shield, label: "Certified Authentic" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Award, label: "2-Year Warranty" },
];

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + tax;
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  function handlePromo(e: React.FormEvent) {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "MAISON5") setPromoApplied(true);
  }

  /* ── Empty State ── */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-20 text-center">
        <ShoppingBag className="mb-5 h-12 w-12 text-stone/30" strokeWidth={1} />
        <h1 className="font-serif text-3xl text-foreground">Your bag is empty</h1>
        <p className="mt-3 max-w-xs text-sm text-stone">
          Discover exceptional timepieces crafted for those who appreciate the finest artistry.
        </p>
        <Link
          href="/watches"
          className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Explore Collection
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  /* ── Cart ── */
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">

      {/* ── Heading ── */}
      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Shopping Bag</h1>
        <span className="text-sm text-stone">
          {totalQty} {totalQty !== 1 ? "items" : "item"}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">

        {/* ── Cart Items ── */}
        <section aria-label="Cart items">
          <ul role="list" className="divide-y divide-hairline border-y border-hairline">
            {items.map((item) => (
              <li key={item.productId} className="group flex gap-4 py-5 sm:gap-6">

                {/* Image */}
                <Link
                  href={`/watches/${item.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden border border-hairline bg-secondary transition-all duration-300 hover:border-gold"
                  aria-label={`View ${item.name}`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/watches/${item.slug}`}
                        className="font-serif text-base leading-snug text-foreground transition-colors hover:text-gold sm:text-lg"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 font-mono text-sm text-gold">
                        {formatPriceCents(item.priceCents)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="mt-0.5 shrink-0 cursor-pointer p-1 text-stone/40 transition-colors hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Bottom row: qty + total */}
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div
                      className="flex items-center border border-hairline"
                      role="group"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center text-stone transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span
                        aria-live="polite"
                        className="flex h-8 w-10 items-center justify-center border-x border-hairline font-mono text-sm tabular-nums"
                      >
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

                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
                        {formatPriceCents(item.priceCents * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-stone/50">
                          {item.quantity} × {formatPriceCents(item.priceCents)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Continue + Services */}
          <div className="mt-5">
            <Link
              href="/watches"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:text-gold"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Compact service badges */}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-hairline pt-6">
            {SERVICES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-stone">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Order Summary ── */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="border border-hairline bg-secondary p-5 space-y-4">

            {/* Price rows */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="font-mono tabular-nums">{formatPriceCents(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gold">Discount (MAISON5)</span>
                  <span className="font-mono tabular-nums text-gold">−{formatPriceCents(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone">Shipping</span>
                <span className="text-sm font-medium text-gold">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone">Tax (est. 8%)</span>
                <span className="font-mono tabular-nums">{formatPriceCents(tax)}</span>
              </div>
            </div>

            {/* Promo */}
            <form onSubmit={handlePromo} className="border-y border-hairline py-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-stone/40" />
                  <input
                    id="promo-input"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    disabled={promoApplied}
                    aria-label="Promotional code"
                    className="w-full border border-hairline bg-white py-2 pl-8 pr-3 text-sm placeholder:text-stone/40 focus:border-gold focus:outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode.trim()}
                  className="cursor-pointer border border-foreground bg-white px-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground transition-all hover:border-gold hover:bg-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {promoApplied ? "✓" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <p className="mt-1.5 text-[11px] text-gold">5% discount applied.</p>
              )}
            </form>

            {/* Total */}
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-lg text-foreground">Total</span>
              <span className="font-mono text-xl font-semibold tabular-nums text-foreground">
                {formatPriceCents(total)}
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 border border-ink bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:border-gold hover:bg-gold"
            >
              Proceed to Checkout
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* SSL + payments */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone/50">
              <Lock className="h-3 w-3" />
              <span>SSL encrypted & secure checkout</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 border-t border-hairline pt-4">
              {["VISA", "MC", "AMEX", "PayPal"].map((pm) => (
                <span
                  key={pm}
                  className="rounded border border-hairline bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-stone/60"
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
