import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";
import { FilterBar } from "./_components/filter-bar";

export const metadata: Metadata = {
  title: "All Watches",
  description:
    "Browse the complete Maison Temps collection — fine mechanical watches across the Aero, Pulse, Studio, and Summit families.",
};

type Props = {
  searchParams: Promise<{ sort?: string; collection?: string; category?: string }>;
};

export default async function WatchesPage({ searchParams }: Props) {
  const { sort, collection, category } = await searchParams;

  // Build orderBy
  type OrderBy =
    | { createdAt: "desc" | "asc" }
    | { priceCents: "asc" | "desc" }
    | { featured: "desc" };

  let orderBy: OrderBy = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { priceCents: "asc" };
  else if (sort === "price-desc") orderBy = { priceCents: "desc" };
  else if (sort === "best") orderBy = { featured: "desc" };

  // Build where clause
  const where: {
    collection?: { slug: string };
    category?: string;
  } = {};
  if (collection && collection !== "all") {
    where.collection = { slug: collection };
  }
  if (category) {
    where.category = category;
  }

  const products = await prisma.product.findMany({
    where,
    include: { collection: true },
    orderBy,
  });

  return (
    <div className="bg-background">
      {/* ── Header ── */}
      <section className="border-b border-hairline bg-[#f5f1ea] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">All Watches</span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            The Complete{" "}
            <em className="not-italic text-gold">Collection</em>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
            Every reference, every family. Fine mechanical watches built for a
            lifetime of wear.
          </p>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Filter bar */}
          <Suspense fallback={<div className="h-10 animate-pulse bg-secondary" />}>
            <FilterBar />
          </Suspense>

          {/* Count */}
          <p className="mt-8 mb-6 text-xs font-medium uppercase tracking-[0.14em] text-stone">
            Showing {products.length} watch{products.length !== 1 ? "es" : ""}
          </p>

          {/* Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <div className="h-[5px] w-[5px] rotate-45 border border-gold" />
              <p className="font-serif text-2xl text-stone">No watches found.</p>
              <Link
                href="/watches"
                className="mt-2 border-b border-foreground/25 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground hover:border-gold hover:text-gold"
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
              {products.map((product) => {
                const images = JSON.parse(product.images) as string[];
                return (
                  <article key={product.id} className="group cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.13)]">
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
                        <div className="absolute inset-0 bg-ink/[0.07] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

                    {/* Info */}
                    <Link href={`/watches/${product.slug}`} className="mt-4 block">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone/70">
                        {product.collection.name}&nbsp;·&nbsp;{product.caseSize}
                      </p>
                      <h3 className="mt-1.5 font-serif text-[15px] font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-gold sm:text-base">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 font-mono text-sm font-semibold text-gold">
                        {formatPriceCents(product.priceCents)}
                      </p>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
