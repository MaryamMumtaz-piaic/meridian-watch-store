"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useToast } from "@/lib/store/toast";
import { formatPriceCents } from "@/lib/format";

type Product = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image: string;
};

export function RelatedAddToCart({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToast();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    addToast({
      type: "cart",
      title: product.name,
      price: formatPriceCents(product.priceCents),
      image: product.image,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded border border-stone/20 bg-white py-2 text-[11px] font-bold uppercase tracking-widest text-ink transition-all hover:border-ink hover:bg-ink hover:text-white"
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
          Add to Cart
        </>
      )}
    </button>
  );
}
