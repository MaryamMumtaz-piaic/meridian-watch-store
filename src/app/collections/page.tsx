import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore the four Maison Temps collections — Aero, Pulse, Studio, and Summit — each a distinct expression of mechanical excellence.",
};

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="border-b border-hairline bg-[#f5f1ea] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">Our Collections</span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Explore Our <em className="not-italic text-gold">Timepieces</em>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-stone">
            Four families. One standard. Each collection speaks to a different
            calling — from the cockpit to the boardroom, the trail to the deep.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-[3px] w-14 bg-gold" />
            <div className="h-[3px] w-3 bg-gold/30" />
          </div>
        </div>
      </section>

      {/* ── Collection grid ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.12)]">
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-ink/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <div className="mt-5">
                  <h2 className="font-serif text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-gold">
                    {col.name}
                  </h2>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-stone/70">
                    {col._count.products} reference{col._count.products !== 1 ? "s" : ""}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone">
                    {col.description}
                  </p>
                  <span className="mt-4 inline-block border-b border-foreground/25 pb-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors duration-200 group-hover:border-gold group-hover:text-gold">
                    Explore Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
