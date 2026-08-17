import Image from "next/image";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";
import type { ProductCardData } from "@/lib/queries";
import { WishlistButton } from "@/components/product/wishlist-button";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: ProductCardData;
  priority?: boolean;
  className?: string;
}) {
  const [primary, secondary] = product.images;

  return (
    <article className={cn("group relative", className)}>
      <Link href={`/watches/${product.slug}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-cream-dark">
          {primary ? (
            <Image
              src={primary.url}
              alt={primary.alt}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className={cn(
                "object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                secondary
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-105",
              )}
            />
          ) : null}

          {secondary ? (
            <Image
              src={secondary.url}
              alt={secondary.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
            />
          ) : null}

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew ? (
              <span className="eyebrow bg-ink px-3 py-1.5 text-cream">New</span>
            ) : null}
            {product.stock === 0 ? (
              <span className="eyebrow bg-cream px-3 py-1.5 text-ink">
                Enquire
              </span>
            ) : product.stock <= 2 ? (
              <span className="eyebrow bg-gold px-3 py-1.5 text-ink">
                {product.stock} Remaining
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <WishlistButton
        slug={product.slug}
        className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100"
      />

      <Link href={`/watches/${product.slug}`} className="mt-5 block">
        <p className="eyebrow text-gold">{product.collection.name}</p>
        <h3 className="mt-2 font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-gold-dark">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-stone">
          {product.caseSize}mm · {product.caseMaterial}
        </p>
        <p className="mt-3 text-sm tabular-nums text-ink">
          {formatPrice(product.priceCents, product.currency)}
        </p>
      </Link>
    </article>
  );
}
