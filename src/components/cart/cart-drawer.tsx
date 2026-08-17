"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { cartCount, cartSubtotal, useCart } from "@/lib/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQuantity } = useCart();
  const [mounted, setMounted] = React.useState(false);

  // Cart is persisted to localStorage, so first paint must match the server
  // (empty) and only reveal real quantities after hydration.
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const subtotal = cartSubtotal(lines);
  const count = cartCount(lines);

  return (
    <div
      className={cn(
        "fixed inset-0 z-70",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink/55 transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-cream transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-7 py-6">
          <div>
            <p className="eyebrow text-gold">Your Selection</p>
            <p className="mt-1 font-display text-xl">
              {mounted ? `${count} ${count === 1 ? "Piece" : "Pieces"}` : "Bag"}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close bag"
            className="cursor-pointer text-ink transition-colors hover:text-gold"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {!mounted || lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="font-display text-2xl text-ink">Your bag is empty</p>
            <p className="max-w-xs text-sm leading-relaxed text-stone">
              Explore the collections and add a piece to begin.
            </p>
            <ButtonLink href="/watches" onClick={close} variant="outline">
              Browse Watches
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-ink/8 overflow-y-auto px-7">
              {lines.map((line) => (
                <div key={line.productId} className="flex gap-4 py-6">
                  <Link
                    href={`/watches/${line.slug}`}
                    onClick={close}
                    className="relative h-28 w-22 shrink-0 overflow-hidden bg-cream-dark"
                  >
                    <Image
                      src={line.imageUrl}
                      alt={line.name}
                      fill
                      sizes="88px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/watches/${line.slug}`}
                      onClick={close}
                      className="font-display text-[0.9375rem] leading-snug text-ink hover:text-gold"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1 text-[0.6875rem] tracking-wider text-stone-light">
                      {line.reference}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-ink/15">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productId, line.quantity - 1)
                          }
                          disabled={line.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="cursor-pointer px-2 py-1.5 text-ink transition-colors hover:text-gold disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="min-w-7 text-center text-xs tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(line.productId, line.quantity + 1)
                          }
                          disabled={line.quantity >= line.stock}
                          aria-label="Increase quantity"
                          className="cursor-pointer px-2 py-1.5 text-ink transition-colors hover:text-gold disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>

                      <p className="text-sm tabular-nums">
                        {formatPrice(line.priceCents * line.quantity)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(line.productId)}
                      className="mt-3 cursor-pointer self-start text-[0.625rem] tracking-[0.16em] text-stone-light uppercase transition-colors hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/10 px-7 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-stone">Subtotal</span>
                <span className="font-display text-xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-light">
                Duties and taxes calculated at checkout. Insured delivery
                included.
              </p>

              <div className="mt-6 grid gap-3">
                <ButtonLink
                  href="/checkout/shipping"
                  onClick={close}
                  className="w-full"
                >
                  Proceed to Checkout
                </ButtonLink>
                <ButtonLink
                  href="/cart"
                  onClick={close}
                  variant="outline"
                  className="w-full"
                >
                  View Bag
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
