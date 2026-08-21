"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore, type WishlistItem } from "@/lib/store/wishlist";
import { useToast } from "@/lib/store/toast";
import { formatPriceCents } from "@/lib/format";

type Product = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image: string;
};

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToast();
  const isSaved = useWishlistStore((s) => s.isSaved(product.productId));
  const toggle = useWishlistStore((s) => s.toggle);

  const wishlistItem: WishlistItem = {
    productId: product.productId,
    slug: product.slug,
    name: product.name,
    priceCents: product.priceCents,
    image: product.image,
  };

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);

    addToast({
      type: "cart",
      title: product.name,
      price: `${quantity > 1 ? `${quantity} × ` : ""}${formatPriceCents(product.priceCents)}`,
      image: product.image,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity */}
      <div className="flex items-center gap-0">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-hairline text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-11 w-14 items-center justify-center border-y border-hairline font-mono text-sm font-semibold text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-hairline text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-ink bg-ink py-4 text-xs font-semibold uppercase tracking-[0.16em] text-parchment transition-all duration-300 hover:border-gold hover:bg-gold"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </>
        )}
      </button>

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => toggle(wishlistItem)}
        className={`flex w-full cursor-pointer items-center justify-center gap-2.5 border py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
          isSaved
            ? "border-gold bg-gold/10 text-gold"
            : "border-hairline bg-background text-foreground hover:border-gold hover:text-gold"
        }`}
      >
        <Heart
          className="h-4 w-4"
          fill={isSaved ? "currentColor" : "none"}
        />
        {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
      </button>
    </div>
  );
}
