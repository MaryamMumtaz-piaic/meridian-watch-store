import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function FeaturedCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
  });

  if (!collections.length) return null;

  // 4 copies → animation moves exactly 1/4 of total width = 1 set → perfect seamless loop
  const track = [...collections, ...collections, ...collections, ...collections];

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
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
        <div className="collections-marquee flex w-max gap-4 px-4">
          {track.map((collection, i) => {
            const num = String((i % collections.length) + 1).padStart(2, "0");
            return (
              <Link
                key={`${collection.slug}-${i}`}
                href={`/collections/${collection.slug}`}
                aria-label={`Explore ${collection.name}`}
                className="group relative flex w-[280px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-hairline bg-background transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_16px_48px_-12px_rgba(28,25,23,0.2)]"
              >
                {/* Square image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />

                  {/* Gradient overlay slides up on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 translate-y-full bg-gradient-to-t from-ink/80 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0" />

                  {/* Explore text over image */}
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-between px-4 py-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/90">Explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-white/80">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Number badge */}
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-white/20 bg-ink/35 backdrop-blur-sm">
                    <span className="font-serif text-xs text-white/70 transition-colors duration-300 group-hover:text-white">{num}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col px-5 py-4">
                  <h3 className="font-serif text-[1.25rem] font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                    {collection.name}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-[1.75] text-stone">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone/60 transition-colors duration-300 group-hover:text-gold">
                      Discover
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center border border-hairline transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-foreground transition-colors duration-300 group-hover:text-white">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Gold bottom bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
              </Link>
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
