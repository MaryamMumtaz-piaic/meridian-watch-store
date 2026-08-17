"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { WishlistButton } from "@/components/product/wishlist-button";
import { Button } from "@/components/ui/button";

export function AddToCart({
  productId,
  slug,
  name,
  reference,
  priceCents,
  imageUrl,
  caseMaterial,
  stock,
}: {
  productId: string;
  slug: string;
  name: string;
  reference: string;
  priceCents: number;
  imageUrl: string;
  caseMaterial: string;
  stock: number;
}) {
  const add = useCart((s) => s.add);
  const [quantity, setQuantity] = React.useState(1);
  const [justAdded, setJustAdded] = React.useState(false);

  const soldOut = stock === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {!soldOut ? (
          <div className="flex items-center border border-ink/15">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="cursor-pointer px-4 py-3.5 text-ink transition-colors hover:text-gold disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <span className="min-w-9 text-center text-sm tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
              disabled={quantity >= stock}
              aria-label="Increase quantity"
              className="cursor-pointer px-4 py-3.5 text-ink transition-colors hover:text-gold disabled:opacity-30"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        ) : null}

        <Button
          type="button"
          variant="gold"
          size="lg"
          disabled={soldOut}
          className="flex-1"
          onClick={() => {
            add(
              {
                productId,
                slug,
                name,
                reference,
                priceCents,
                imageUrl,
                caseMaterial,
                stock,
              },
              quantity,
            );
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 2200);
          }}
        >
          {soldOut ? "Notify Me When Available" : justAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>

      <WishlistButton slug={slug} withLabel />
    </div>
  );
}
