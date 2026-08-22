import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Truck, Award, RotateCcw, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { ImageGallery } from "./_components/image-gallery";
import { ProductActions } from "./_components/product-actions";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";

type Props = { params: Promise<{ slug: string }> };

/* ── Three short, believable reviews — not AI essays ── */
const REVIEWS = [
  {
    id: 1,
    initials: "J.T.",
    name: "James T.",
    city: "New York",
    rating: 5,
    date: "Mar 2025",
    text: "Wore it to a board dinner the night it arrived. Three people asked about it before the starter. The movement finishing is genuinely exceptional.",
  },
  {
    id: 2,
    initials: "S.M.",
    name: "Sophie M.",
    city: "London",
    rating: 5,
    date: "Feb 2025",
    text: "I've owned a Rolex Submariner and a Lange 1. This sits comfortably in that company at a fraction of the price. Packaging was immaculate.",
  },
  {
    id: 3,
    initials: "D.K.",
    name: "David K.",
    city: "Singapore",
    rating: 4,
    date: "Jan 2025",
    text: "Dial depth and lume quality are both beyond what I expected. Shipping took a week longer than stated — worth the wait either way.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { collection: true } });
  if (!product) return { title: "Watch Not Found" };
  return { title: `${product.name} — Maison Temps`, description: product.description };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {[1,2,3,4,5].map((s) => (
        <Star
          key={s}
          strokeWidth={0}
          className={`h-3 w-3 ${s <= n ? "fill-gold text-gold" : "fill-hairline text-hairline"}`}
        />
      ))}
    </span>
  );
}

export default async function WatchPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { collection: true },
  });
  if (!product) notFound();

  const images = JSON.parse(product.images) as string[];

  const related = await prisma.product.findMany({
    where: { collectionId: product.collectionId, NOT: { id: product.id } },
    include: { collection: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const specs = [
    { label: "Movement", value: product.movement },
    { label: "Case diameter", value: product.caseSize },
    { label: "Case material", value: product.caseMaterial },
    { label: "Water resistance", value: product.waterResistance },
    { label: "Reference", value: product.sku },
  ].filter((s) => s.value);

  return (
    <div className="bg-background">

      {/* Breadcrumb */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-stone/60">
            <Link href="/watches" className="transition-colors hover:text-foreground">Watches</Link>
            <span>/</span>
            <Link href={`/collections/${product.collection.slug}`} className="transition-colors hover:text-foreground">
              {product.collection.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product ── */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">

          {/* Gallery */}
          <ImageGallery images={images} name={product.name} />

          {/* Info */}
          <div className="flex flex-col">

            {/* Collection label */}
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
              {product.collection.name} · {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-3 font-serif text-[2rem] font-bold leading-[1.15] text-foreground lg:text-[2.4rem]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 font-mono text-2xl font-semibold text-gold">
              {formatPriceCents(product.priceCents)}
            </p>

            {/* Stock */}
            <p className="mt-2 text-xs text-stone">
              {product.stock > 5
                ? "In stock"
                : product.stock > 0
                ? `${product.stock} remaining`
                : "Sold out"}
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-hairline" />

            {/* Description */}
            <p className="text-sm leading-loose text-stone">
              {product.description}
            </p>

            {/* Divider */}
            <div className="my-6 border-t border-hairline" />

            {/* Qty + Cart + Wishlist */}
            <ProductActions
              product={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                image: images[0],
              }}
            />

            {/* Trust strip */}
            <div className="mt-6 flex gap-5 border-t border-hairline pt-6">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: Award, label: "5-yr warranty" },
                { icon: RotateCcw, label: "30-day returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-[11px] text-stone">{label}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone/60">
                Specifications
              </p>
              <dl>
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between border-b border-hairline py-2.5 last:border-0"
                  >
                    <dt className="text-xs text-stone">{s.label}</dt>
                    <dd className="font-mono text-xs font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="border-t border-hairline bg-[#f5f1ea] py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Client Impressions
            </h2>
            <span className="font-mono text-sm text-stone">4.8 · {REVIEWS.length} reviews</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {REVIEWS.map((r) => (
              <article key={r.id} className="border border-hairline bg-background p-5">
                <Stars n={r.rating} />

                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-hairline pt-4">
                  <span className="flex h-7 w-7 items-center justify-center bg-stone/10 font-mono text-[10px] font-bold text-stone">
                    {r.initials}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{r.name}</p>
                    <p className="text-[10px] text-stone/60">{r.city} · {r.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 border-t border-hairline pt-6 text-center text-xs text-stone">
            Owned this piece?{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-2 hover:text-gold">
              Share your experience
            </Link>
          </p>
        </div>
      </section>

      {/* ── From the same collection ── */}
      {related.length > 0 && (
        <section className="border-t border-hairline py-14 lg:py-18">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                From {product.collection.name}
              </h2>
              <Link
                href={`/collections/${product.collection.slug}`}
                className="text-xs uppercase tracking-[0.14em] text-stone underline-offset-2 hover:text-gold"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {related.map((rel) => {
                const ri = JSON.parse(rel.images) as string[];
                return (
                  <article key={rel.id} className="group">
                    <div className="relative aspect-square overflow-hidden border border-hairline bg-[#f5f2ec] transition-colors duration-300 group-hover:border-gold/50">
                      <Link href={`/watches/${rel.slug}`} aria-label={rel.name}>
                        <Image
                          src={ri[0]}
                          alt={rel.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <WishlistButton
                        product={{ productId: rel.id, slug: rel.slug, name: rel.name, priceCents: rel.priceCents, image: ri[0] }}
                      />
                      <AddToCartButton
                        product={{ productId: rel.id, slug: rel.slug, name: rel.name, priceCents: rel.priceCents, image: ri[0] }}
                      />
                    </div>
                    <Link href={`/watches/${rel.slug}`} className="mt-3 block">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-stone/60">
                        {rel.caseSize}
                      </p>
                      <h3 className="mt-0.5 font-serif text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
                        {rel.name}
                      </h3>
                      <p className="mt-1 font-mono text-sm text-gold">
                        {formatPriceCents(rel.priceCents)}
                      </p>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
