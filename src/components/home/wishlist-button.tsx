"use client";

import { Heart } from "lucide-react";
import { useWishlistStore, type WishlistItem } from "@/lib/store/wishlist";

export function WishlistButton({ product }: { product: WishlistItem }) {
  const saved = useWishlistStore((state) => state.isSaved(product.productId));
  const toggle = useWishlistStore((state) => state.toggle);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    toggle(product);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={saved}
      className={`absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition-all duration-200 hover:bg-gold hover:text-white ${
        saved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
