"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export function AddToCartButton({
  product,
}: {
  product: { productId: string; slug: string; name: string; priceCents: number; image: string };
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${product.name} to cart`}
      className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full cursor-pointer items-center justify-center gap-2 bg-ink/90 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-parchment backdrop-blur transition-all duration-300 ease-out hover:bg-gold hover:text-white group-hover:translate-y-0"
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" /> Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
        </>
      )}
    </button>
  );
}
