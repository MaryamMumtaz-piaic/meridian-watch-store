"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({
  slug,
  className,
  withLabel = false,
}: {
  slug: string;
  className?: string;
  withLabel?: boolean;
}) {
  const slugs = useWishlist((s) => s.slugs);
  const toggle = useWishlist((s) => s.toggle);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const saved = mounted && slugs.includes(slug);

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        className={cn(
          "eyebrow flex cursor-pointer items-center gap-2.5 text-stone transition-colors hover:text-ink",
          saved && "text-ink",
          className,
        )}
      >
        <Heart
          className="h-4 w-4"
          strokeWidth={1.5}
          fill={saved ? "currentColor" : "none"}
        />
        {saved ? "Saved" : "Save this piece"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle(slug);
      }}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-9 w-9 cursor-pointer items-center justify-center bg-cream/90 text-ink backdrop-blur transition-all duration-300 hover:bg-cream hover:text-gold",
        className,
      )}
    >
      <Heart
        className="h-4 w-4"
        strokeWidth={1.5}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
