import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Royale Chronograph",
    collection: "Heritage",
    caseSize: "42mm",
    price: "$12,500",
    image: "/top-product/1.jpg",
    slug: "watches",
  },
  {
    id: 2,
    name: "Céleste GMT",
    collection: "Dress",
    caseSize: "40mm",
    price: "$11,200",
    image: "/top-product/2.jpg",
    slug: "watches",
  },
  {
    id: 3,
    name: "Abyss Diver Pro",
    collection: "Sport",
    caseSize: "44mm",
    price: "$9,750",
    image: "/top-product/3.jpg",
    slug: "watches",
  },
  {
    id: 4,
    name: "Nocturne Skeleton",
    collection: "Avant-Garde",
    caseSize: "43mm",
    price: "$15,600",
    image: "/top-product/4.jpg",
    slug: "watches",
  },
  {
    id: 5,
    name: "Heritage Dress",
    collection: "Classic",
    caseSize: "38mm",
    price: "$8,900",
    image: "/top-product/5.jpg",
    slug: "watches",
  },
  {
    id: 6,
    name: "Obsidian Tourbillon",
    collection: "Haute",
    caseSize: "41mm",
    price: "$24,800",
    image: "/top-product/6.jpg",
    slug: "watches",
  },
  {
    id: 7,
    name: "Côte Azur",
    collection: "Dress",
    caseSize: "39mm",
    price: "$7,400",
    image: "/top-product/7.jpg",
    slug: "watches",
  },
  {
    id: 8,
    name: "Lumière Ultra-Thin",
    collection: "Classic",
    caseSize: "36mm",
    price: "$6,950",
    image: "/top-product/8.jpg",
    slug: "watches",
  },
];

export function TopSelling() {
  return (
    <section className="relative bg-[#f7f4ef] py-20 lg:py-28">
      {/* Top accent line */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-8">
          {/* Left — headline block */}
          <div>
            <span className="eyebrow tracking-[0.2em] text-gold">
              Best Sellers
            </span>

            <h2 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our most coveted{" "}
              <em className="not-italic text-gold">timepieces.</em>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone/80">
              Handpicked by our maison — the eight references that define a
              generation of collectors. Each one carries a story worth wearing.
            </p>

          </div>

          {/* Right — desktop CTA */}
          <div className="hidden shrink-0 pb-1 sm:block">
            <Link
              href="/watches"
              className="group flex items-center gap-2 border-b border-foreground/25 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-all duration-200 hover:border-gold hover:text-gold"
            >
              View All Products
              <ArrowRight
                className="h-[11px] w-[11px] transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
          {TOP_PRODUCTS.map((product) => (
            <article key={product.id} className="group cursor-pointer">
              {/* Image */}
              <Link href={`/${product.slug}`} aria-label={`View ${product.name}`}>
                <div className="relative aspect-square w-full overflow-hidden border border-stone/15 bg-white shadow-sm transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-[0_14px_36px_-8px_rgba(0,0,0,0.14)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Hover vignette */}
                  <div className="absolute inset-0 bg-ink/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Rank badge */}
                  <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center bg-gold text-[10px] font-bold text-white">
                    {product.id}
                  </div>
                </div>
              </Link>

              {/* Info */}
              <Link href={`/${product.slug}`} className="mt-4 block">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone/60">
                  {product.collection}&nbsp;·&nbsp;{product.caseSize}
                </p>
                <h3 className="mt-1.5 font-serif text-[15px] font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-gold sm:text-base">
                  {product.name}
                </h3>
                <p className="mt-1.5 font-mono text-sm font-semibold text-gold">
                  {product.price}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom CTA button */}
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
        {/* Divider */}
        <div className="mb-12 border-t border-stone/20" />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-stone/60">
            Explore the complete collection
          </p>
          <Link
            href="/watches"
            className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-gold hover:border-gold"
          >
            View All Products
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
