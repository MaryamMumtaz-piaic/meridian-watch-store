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
      className="absolute bottom-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-background/90 text-foreground opacity-0 backdrop-blur transition-opacity duration-200 hover:bg-gold hover:text-white group-hover:opacity-100"
    >
      {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
    </button>
  );
}
