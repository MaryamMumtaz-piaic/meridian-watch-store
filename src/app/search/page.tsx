import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";

export const metadata: Metadata = {
  title: "Search Watches",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const products = query
    ? (
        await prisma.product.findMany({
          include: { collection: true },
          orderBy: { name: "asc" },
        })
      ).filter((product) => {
        const haystack =
          `${product.name} ${product.category} ${product.collection.name} ${product.movement}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <span className="eyebrow">Search</span>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
        {query ? `Results for “${query}”` : "Search Maison Temps"}
      </h1>

      {query && products.length === 0 && (
        <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
          Nothing matched “{query}”. Try a collection name — Aero, Pulse,
          Studio, Summit — or a case material like titanium or ceramic.
        </p>
      )}

      {products.length > 0 && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const images = JSON.parse(product.images) as string[];
            return (
              <Link
                key={product.id}
                href={`/watches/${product.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-secondary transition-colors group-hover:border-gold">
                  <Image
                    src={images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
                      {product.collection.name} · {product.caseSize}
                    </p>
                    <h2 className="mt-1 font-serif text-lg text-foreground">{product.name}</h2>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-foreground">
                    {formatPriceCents(product.priceCents)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
