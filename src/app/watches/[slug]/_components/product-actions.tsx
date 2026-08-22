"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Zap, Check } from "lucide-react";
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

  const router = useRouter();
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

  function handleQtyInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v) && v >= 1 && v <= 99) setQuantity(v);
  }

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

  function handleBuyNow() {
    addItem(product, quantity);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Quantity ── */}
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone">
          Quantity
        </p>
        <div className="flex h-12 w-36 items-stretch overflow-hidden rounded border border-stone/25">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex w-12 cursor-pointer items-center justify-center bg-[#f5f2ed] text-xl font-light text-stone transition-colors hover:bg-hairline hover:text-ink select-none"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={handleQtyInput}
            aria-label="Quantity"
            className="w-12 flex-1 border-x border-stone/25 bg-white text-center font-sans text-base font-bold text-ink focus:outline-none focus:ring-1 focus:ring-gold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="flex w-12 cursor-pointer items-center justify-center bg-[#f5f2ed] text-xl font-light text-stone transition-colors hover:bg-hairline hover:text-ink select-none"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Add to Cart + Buy Now — side by side ── */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded bg-ink py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-parchment transition-all duration-200 hover:bg-[#2c2825] active:scale-[0.99]"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
              Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded border-2 border-[#c9a227] bg-[#c9a227] py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-[#b8911e] hover:border-[#b8911e] active:scale-[0.99]"
        >
          <Zap className="h-4 w-4" strokeWidth={2} />
          Buy Now
        </button>
      </div>

      {/* ── Wishlist ── */}
      <button
        type="button"
        onClick={() => toggle(wishlistItem)}
        className={`flex cursor-pointer items-center justify-center gap-2 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
          isSaved ? "text-[#c9a227]" : "text-stone hover:text-ink"
        }`}
      >
        <Heart
          className="h-3.5 w-3.5"
          strokeWidth={2}
          fill={isSaved ? "currentColor" : "none"}
        />
        {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
      </button>
    </div>
  );
}
