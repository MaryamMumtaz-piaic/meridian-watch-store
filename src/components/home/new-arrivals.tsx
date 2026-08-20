import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";

export async function NewArrivals() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { collection: true },
    orderBy: { createdAt: "asc" },
    take: 8,
  });

  if (!products.length) return null;

  return (
    <section className="bg-white py-20 lg:py-28">

      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-start justify-between gap-8">

          {/* Left — big editorial headline */}
          <div>
            <span className="eyebrow">New Arrivals</span>

            <h2 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
              Eight watches.{" "}
              <em className="not-italic text-gold">One season.</em>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone">
              Fresh references — across all four collections — just added to the case.
            </p>

            {/* Gold rule accent */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-[3px] w-14 bg-gold" />
              <div className="h-[3px] w-3 bg-gold/30" />
            </div>
          </div>

          {/* Right — Shop All link (desktop) */}
          <div className="hidden shrink-0 pt-2 sm:block">
            <Link
              href="/watches"
              className="group flex items-center gap-2 border-b border-foreground/25 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-all duration-200 hover:border-gold hover:text-gold"
            >
              Shop All Watches
              <ArrowRight
                className="h-[11px] w-[11px] transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Product grid: Row 1 (4) + Row 2 (4) ── */}
      <div className="mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {products.map((product) => {
            const images = JSON.parse(product.images) as string[];
            return (
              <article key={product.id} className="group cursor-pointer">

                {/* ── Image container ── */}
                <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary shadow-none transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.13)]">

                  <Link
                    href={`/watches/${product.slug}`}
                    className="relative block h-full w-full"
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                    />
                    {/* Soft vignette on hover */}
                    <div className="absolute inset-0 bg-ink/[0.07] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>

                  {/* Wishlist heart — top right */}
                  <WishlistButton
                    product={{
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      priceCents: product.priceCents,
                      image: images[0],
                    }}
                  />

                  {/* Add to Cart bar — slides up from bottom on hover */}
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

                {/* ── Product info ── */}
                <Link
                  href={`/watches/${product.slug}`}
                  className="mt-4 block"
                >
                  {/* Collection + size tag */}
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone/70">
                    {product.collection.name}&nbsp;·&nbsp;{product.caseSize}
                  </p>

                  {/* Product name */}
                  <h3 className="mt-1.5 font-serif text-[15px] font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-gold sm:text-base">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <p className="mt-1.5 font-mono text-sm font-semibold text-gold">
                    {formatPriceCents(product.priceCents)}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Mobile CTA ── */}
      <div className="mt-12 flex justify-center lg:hidden">
        <Link
          href="/watches"
          className="group flex items-center gap-2 border-b border-foreground/25 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:border-gold hover:text-gold"
        >
          Shop All Watches
          <ArrowRight className="h-[11px] w-[11px] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
