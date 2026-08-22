import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#faf8f4]">

      {/* ── Hero ── */}
      <section className="bg-[#faf8f4] pb-10 pt-14 lg:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            Maison Temps
          </span>
          <h1 className="mt-3 font-sans text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Our Collections
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone">
            Four families. One standard of excellence. Each collection speaks to a
            different calling — from the cockpit to the boardroom, the trail to the deep.
          </p>
        </div>
      </section>

      {/* ── Collection grid ── */}
      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((col, i) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group cursor-pointer"
              >
                {/* Image — portrait aspect, taller card */}
                <div className="relative w-full overflow-hidden bg-[#f0ece5]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                  {/* Collection number badge */}
                  <div className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gold">
                    <span className="font-mono text-[10px] font-bold text-white">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Name overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
                    <h2 className="font-sans text-xl font-extrabold text-white transition-colors duration-200">
                      {col.name}
                    </h2>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                      {col._count.products} reference{col._count.products !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Info below image */}
                <div className="mt-4">
                  <p className="line-clamp-2 text-sm leading-relaxed text-stone">
                    {col.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-200 group-hover:text-gold">
                    Explore
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
