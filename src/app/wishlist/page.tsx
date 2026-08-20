"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";
import { useState } from "react";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
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
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <Heart className="mb-6 h-16 w-16 text-gold/30" />
        <h1 className="font-serif text-3xl text-foreground">Your wishlist is empty</h1>
        <p className="mt-3 text-sm text-stone">
          Save pieces you love to revisit them later.
        </p>
        <Link
          href="/watches"
          className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Start Browsing
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <span className="eyebrow">Your Wishlist</span>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
        Saved Pieces
        <span className="ml-3 font-sans text-base font-normal text-stone">
          ({items.length} item{items.length !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
        {items.map((item) => (
          <article key={item.productId} className="group">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden border border-hairline bg-secondary transition-colors group-hover:border-gold">
              <Link href={`/watches/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Link>
            </div>

            {/* Info */}
            <div className="mt-4">
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

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 border border-ink bg-ink py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                {addedIds.has(item.productId) ? "Added!" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={() => toggle(item)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 border border-hairline py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-stone transition-all hover:border-gold hover:text-gold"
              >
                <Heart className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
