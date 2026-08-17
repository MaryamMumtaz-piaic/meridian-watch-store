"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { cartSubtotal, useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default function CartPage() {
  const { lines, remove, setQuantity } = useCart();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(lines);

  return (
    <Section className="pt-[calc(var(--header-height)+2.5rem)]">
      <Container>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          Your Bag
        </h1>

        {!mounted ? null : lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">
              Your bag is empty
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-stone">
              Explore the collections and add a piece to begin.
            </p>
            <ButtonLink href="/watches" variant="outline">
              Browse Watches
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div className="divide-y divide-ink/8 border-t border-ink/8">
              {lines.map((line) => (
                <div key={line.productId} className="flex gap-5 py-7 sm:gap-7">
                  <Link
                    href={`/watches/${line.slug}`}
                    className="relative h-32 w-26 shrink-0 overflow-hidden bg-cream-dark sm:h-40 sm:w-32"
                  >
                    <Image
                      src={line.imageUrl}
                      alt={line.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/watches/${line.slug}`}
                          className="font-display text-lg text-ink hover:text-gold-dark"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1.5 text-xs text-stone-light">
                          {line.reference} · {line.caseMaterial}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.productId)}
                        aria-label="Remove item"
                        className="cursor-pointer text-stone-light transition-colors hover:text-ink"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6">
                      <div className="flex items-center border border-ink/15">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productId, line.quantity - 1)
                          }
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="cursor-pointer px-3 py-2 text-ink transition-colors hover:text-gold disabled:opacity-30"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                        <span className="min-w-8 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productId, line.quantity + 1)
                          }
                          disabled={line.quantity >= line.stock}
                          aria-label="Increase quantity"
                          className="cursor-pointer px-3 py-2 text-ink transition-colors hover:text-gold disabled:opacity-30"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                      </div>

                      <p className="text-sm tabular-nums text-ink">
                        {formatPrice(line.priceCents * line.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit border border-ink/10 p-7">
              <p className="eyebrow text-stone">Order Summary</p>
              <div className="mt-5 flex justify-between text-sm text-ink">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-light">
                Shipping and tax are calculated at checkout. Insured delivery
                included.
              </p>
              <ButtonLink
                href="/checkout/shipping"
                variant="gold"
                className="mt-7 w-full"
              >
                Proceed to Checkout
              </ButtonLink>
              <ButtonLink
                href="/watches"
                variant="link"
                className="mt-5 w-full"
              >
                Continue Shopping
              </ButtonLink>
            </aside>
          </div>
        )}
      </Container>
    </Section>
  );
}
