"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag, Check } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";
import { useToast } from "@/lib/store/toast";
import { useState } from "react";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToast();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleAddToCart(item: (typeof items)[number]) {
    addItem({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      priceCents: item.priceCents,
      image: item.image,
    });
    setAddedIds((prev) => new Set(prev).add(item.productId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.productId);
        return next;
      });
    }, 1500);
    addToast({
      type: "cart",
      title: item.name,
      price: formatPriceCents(item.priceCents),
      image: item.image,
    });
  }

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-20 text-center">
        <Heart className="mb-5 h-12 w-12 text-gold/25" strokeWidth={1} />
        <h1 className="font-serif text-3xl text-foreground">Your wishlist is empty</h1>
        <p className="mt-3 max-w-xs text-sm text-stone">
          Save pieces you love to revisit them later.
        </p>
        <Link
          href="/watches"
          className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Explore Watches
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
      {/* ── Heading ── */}
      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Saved Pieces</h1>
        <span className="text-sm text-stone">
          {items.length} {items.length !== 1 ? "items" : "item"}
        </span>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
        {items.map((item) => (
          <article key={item.productId} className="group flex flex-col">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden border border-hairline bg-secondary transition-all duration-300 group-hover:border-gold/60">
              <Link href={`/watches/${item.slug}`} aria-label={`View ${item.name}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Link>
              {/* Remove from wishlist (heart) */}
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="absolute right-2.5 top-2.5 cursor-pointer rounded-full border border-hairline bg-white/90 p-1.5 text-gold backdrop-blur-sm transition-all hover:bg-red-50 hover:text-destructive"
              >
                <Heart className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>

            {/* Info */}
            <div className="mt-3 flex-1">
              <Link
                href={`/watches/${item.slug}`}
                className="font-serif text-sm font-semibold leading-snug text-foreground transition-colors hover:text-gold sm:text-base"
              >
                {item.name}
              </Link>
              <p className="mt-0.5 font-mono text-sm text-gold">
                {formatPriceCents(item.priceCents)}
              </p>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={() => handleAddToCart(item)}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 border border-ink bg-ink py-2.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-all hover:border-gold hover:bg-gold"
            >
              {addedIds.has(item.productId) ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
                </>
              )}
            </button>
          </article>
        ))}
      </div>

      {/* Continue shopping */}
      <div className="mt-10 border-t border-hairline pt-8">
        <Link
          href="/watches"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-stone transition-colors hover:text-gold"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
