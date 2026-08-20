import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";

export async function FeaturedCollections() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    include: { collection: true },
    orderBy: { createdAt: "asc" },
  });

  // One flagship product per collection (its first-featured product), ordered by collection sortOrder.
  const seen = new Set<string>();
  const flagships = featuredProducts.filter((product) => {
    if (seen.has(product.collectionId)) return false;
    seen.add(product.collectionId);
    return true;
  });
  flagships.sort((a, b) => a.collection.sortOrder - b.collection.sortOrder);

  if (!flagships.length) return null;

  // 4 copies → animation moves exactly 1/4 of total width = 1 set → perfect seamless loop
  const track = [...flagships, ...flagships, ...flagships, ...flagships];

  return (
    <section className="border-t border-hairline bg-[#f5f1ea] py-20 lg:py-28">

      {/* ── Header ── */}
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">The Collections</span>
            <h2 className="mt-4 font-serif font-semibold text-3xl text-foreground sm:text-4xl">
              Four families.{" "}
              <em className="font-semibold not-italic text-gold">One standard.</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="group hidden shrink-0 cursor-pointer items-center gap-2 border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold sm:flex"
          >
            View All
            <ArrowRight className="h-[11px] w-[11px] transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-hairline" />
          <div className="h-[5px] w-[5px] rotate-45 border border-gold" />
          <div className="h-px flex-1 bg-hairline" />
        </div>
      </div>

      {/* ── Infinite marquee ── */}
      <div className="collections-marquee-wrap relative overflow-hidden">

        {/* Fade edges */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#f5f1ea] to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#f5f1ea] to-transparent" />

        {/* Track: 4 copies, animate -25% → 0% = exactly 1 set scrolled */}
        <div className="collections-marquee flex w-max gap-8 px-4">
          {track.map((product, i) => {
            const images = JSON.parse(product.images) as string[];
            return (
              <div key={`${product.slug}-${i}`} className="group w-[280px] shrink-0">
                <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary transition-colors group-hover:border-gold">
                  <Link href={`/watches/${product.slug}`} className="relative block h-full w-full cursor-pointer">
                    <Image
                      src={images[0]}
                      alt={product.name}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <WishlistButton
                    product={{
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      priceCents: product.priceCents,
                      image: images[0],
                    }}
                  />
                  <AddToCartButton
                    product={{
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      priceCents: product.priceCents,
                      image: images[0],
                    }}
                  />
                </div>
                <Link href={`/watches/${product.slug}`} className="mt-4 block cursor-pointer">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
                    {product.collection.name} · {product.caseSize}
                  </p>
                  <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-gold">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-base font-semibold text-foreground">
                    {formatPriceCents(product.priceCents)}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-10 flex justify-center sm:hidden">
        <Link href="/collections" className="border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground hover:border-gold hover:text-gold">
          View All Collections
        </Link>
      </div>
    </section>
  );
}
