import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Star, Truck, Award, RotateCcw, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { ImageGallery } from "./_components/image-gallery";
import { ProductActions } from "./_components/product-actions";
import { WishlistButton } from "@/components/home/wishlist-button";
import { RelatedAddToCart } from "./_components/related-add-to-cart";

type Props = { params: Promise<{ slug: string }> };

const REVIEWS = [
  {
    id: 1,
    initials: "JT",
    name: "James T.",
    city: "New York",
    rating: 5,
    date: "Mar 2025",
    verified: true,
    text: "Wore it to a board dinner the night it arrived. Three people asked about it before the starter. The movement finishing is genuinely exceptional.",
  },
  {
    id: 2,
    initials: "SM",
    name: "Sophie M.",
    city: "London",
    rating: 5,
    date: "Feb 2025",
    verified: true,
    text: "I've owned a Rolex Submariner and a Lange 1. This sits comfortably in that company at a fraction of the price. Packaging was immaculate.",
  },
  {
    id: 3,
    initials: "DK",
    name: "David K.",
    city: "Singapore",
    rating: 4,
    date: "Jan 2025",
    verified: true,
    text: "Dial depth and lume quality are both beyond what I expected. Shipping took a week longer than stated — worth the wait either way.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, include: { collection: true } });
  if (!product) return { title: "Watch Not Found" };
  return { title: product.name, description: product.description ?? undefined };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

function StarRow({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          strokeWidth={0}
          className={`h-3.5 w-3.5 ${s <= n ? "fill-[#c9a227] text-[#c9a227]" : "fill-[#e4dfd3] text-[#e4dfd3]"}`}
        />
      ))}
    </span>
  );
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 text-right text-xs text-stone">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-hairline">
        <div className="h-full rounded-full bg-[#c9a227]" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-7 text-xs text-stone">{pct}%</span>
    </div>
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
    { label: "Reference No.",    value: product.sku },
    { label: "Movement",         value: product.movement },
    { label: "Case Diameter",    value: product.caseSize },
    { label: "Case Material",    value: product.caseMaterial },
    { label: "Water Resistance", value: product.waterResistance },
    { label: "Category",         value: product.category },
  ].filter((s) => s.value);

  const chips = [
    product.caseSize      && { label: "Case Size",  value: product.caseSize },
    product.caseMaterial  && { label: "Material",   value: product.caseMaterial },
    product.movement      && { label: "Movement",   value: product.movement },
  ].filter(Boolean) as { label: string; value: string }[];

  const avgRating = 4.8;
  const reviewCount = REVIEWS.length;

  return (
    <div className="bg-[#faf8f4]">

      {/* ══════════════════════════════════════
          PRODUCT — main two-column section
      ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 lg:px-10 lg:pt-8 lg:pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[440px_1fr] lg:gap-12 xl:gap-16">

          {/* ── Left: Gallery ── */}
          <ImageGallery images={images} name={product.name} />

          {/* ── Right: Product info ── */}
          <div className="flex flex-col">

            {/* Brand + collection */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/collections/${product.collection.slug}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a227] transition-opacity hover:opacity-70"
              >
                Maison Temps
              </Link>
              <span className="text-hairline">·</span>
              <span className="rounded bg-stone/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-stone">
                {product.collection.name}
              </span>
              <span className="text-hairline">·</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-stone/60">
                {product.category}
              </span>
            </div>

            {/* Product name */}
            <h1 className="mt-2.5 font-sans text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRow n={Math.round(avgRating)} />
              <span className="text-sm font-bold text-[#c9a227]">{avgRating}</span>
              <Link
                href="#reviews"
                className="text-sm text-stone underline underline-offset-2 hover:text-ink"
              >
                {reviewCount} reviews
              </Link>
              <span className="text-hairline">|</span>
              <span className="text-xs text-stone">Ref: {product.sku}</span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-hairline" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-[2rem] font-extrabold leading-none text-ink">
                {formatPriceCents(product.priceCents)}
              </span>
            </div>

            {/* Stock */}
            <div className="mt-2 flex items-center gap-1.5">
              {product.stock > 5 ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-green-700">In Stock</span>
                  <span className="text-sm text-stone"> — ships within 2 business days</span>
                </>
              ) : product.stock > 0 ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-semibold text-amber-700">Only {product.stock} left</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-sm font-semibold text-red-700">Sold out</span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-hairline" />

            {/* Description */}
            <p className="text-sm leading-7 text-stone">
              {product.description}
            </p>

            {/* Spec chips — highlighted like variant selector */}
            {chips.length > 0 && (
              <div className="mt-5 flex flex-col gap-3">
                {chips.map(({ label, value }) => (
                  <div key={label}>
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-stone">
                      {label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded border-2 border-[#c9a227] bg-[#c9a227]/5 px-4 py-2 text-sm font-bold text-ink shadow-sm">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="my-5 border-t border-hairline" />

            {/* Cart / Buy Now / Wishlist */}
            <ProductActions
              product={{
                productId: product.id,
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                image: images[0],
              }}
            />

            {/* Delivery info */}
            <div className="mt-5 rounded border border-hairline bg-white p-4">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]" strokeWidth={1.5} />
                <div>
                  <p className="text-[12px] font-bold text-ink">Free Insured Express Shipping</p>
                  <p className="mt-0.5 text-[11px] text-stone">Estimated delivery: 3–5 business days worldwide</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-3 border-t border-hairline pt-3">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a227]" strokeWidth={1.5} />
                <div>
                  <p className="text-[12px] font-bold text-ink">30-Day Free Returns</p>
                  <p className="mt-0.5 text-[11px] text-stone">Unworn, in original packaging. Prepaid label included.</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: Award,       title: "5-Year Warranty",     sub: "Transferable certificate" },
                { icon: ShieldCheck, title: "Certified Authentic", sub: "100-point inspection" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5 rounded border border-hairline bg-white px-3 py-3">
                  <Icon className="h-5 w-5 shrink-0 text-[#c9a227]" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-ink">{title}</p>
                    <p className="text-[10px] text-stone">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications */}
            {specs.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-stone/60">
                  Specifications
                </p>
                <dl className="overflow-hidden rounded border border-hairline bg-white">
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i < specs.length - 1 ? "border-b border-hairline" : ""
                      } ${i % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"}`}
                    >
                      <dt className="text-[12px] font-medium text-stone">{s.label}</dt>
                      <dd className="font-mono text-[12px] font-bold text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT THIS WATCH
      ══════════════════════════════════════ */}
      <section className="border-t border-hairline bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">

            {/* Description + highlights */}
            <div>
              <h2 className="font-sans text-xl font-extrabold text-ink">
                About This Watch
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone">
                {product.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-stone">
                The {product.collection.name} collection embodies Maison Temps at its most refined —
                each reference is built to reward close attention and to be worn across decades,
                not seasons.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  `${product.caseSize || "Refined"} case — proportioned for the wrist, not the showroom`,
                  `${product.movement || "Swiss"} movement — regulated to ±4 sec/day across six positions`,
                  `${product.caseMaterial || "Premium"} construction with alternating polish and satin finish`,
                  "Sapphire crystal with double AR-coating, scratch-resistant to 9H",
                  `${product.waterResistance || "Water resistant"} — ISO 22810 certified`,
                  "Arrives in a lacquered presentation box with certificate of authenticity",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-stone">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product image — decorative */}
            <div
              className="relative overflow-hidden bg-white"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={images[0]}
                alt={product.name}
                fill
                sizes="380px"
                className="object-contain object-top p-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT'S INSIDE THE BOX
      ══════════════════════════════════════ */}
      <section className="border-t border-hairline py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-sans text-xl font-extrabold text-ink">
            What&apos;s Included
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { emoji: "⌚", label: "The Watch",         desc: "Fully serviced, timing-verified" },
              { emoji: "📜", label: "Certificate",        desc: "Signed certificate of authenticity" },
              { emoji: "📦", label: "Presentation Box",   desc: "Lacquered, collector-grade packaging" },
              { emoji: "🧤", label: "White Gloves",       desc: "For handling during inspection" },
            ].map(({ emoji, label, desc }) => (
              <div key={label} className="flex flex-col items-start gap-2 rounded border border-hairline bg-white p-4">
                <span className="text-2xl">{emoji}</span>
                <p className="text-[13px] font-bold text-ink">{label}</p>
                <p className="text-[11px] text-stone">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CRAFTSMANSHIP
      ══════════════════════════════════════ */}
      <section className="border-t border-hairline bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-sans text-xl font-extrabold text-ink">
            Materials &amp; Craftsmanship
          </h2>
          <div className="mt-6 grid gap-px bg-hairline border border-hairline sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Case",             value: product.caseMaterial || "—",    note: "Hand-finished: alternating polish and satin" },
              { label: "Movement",         value: product.movement || "—",        note: "COSC-inspired, regulated across 6 positions" },
              { label: "Crystal",          value: "Sapphire, AR-coated",          note: "9H scratch resistance, anti-reflective" },
              { label: "Water Resistance", value: product.waterResistance || "—", note: "ISO 22810 tested, gasket-sealed crown" },
              { label: "Strap",            value: "Vegetable-tanned calfskin",    note: "French tannery, patinas with wear" },
              { label: "Clasp",            value: "Double deployant",             note: "Matching case finish" },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-white px-5 py-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-stone/50">{label}</p>
                <p className="mt-1 text-[13px] font-bold text-ink">{value}</p>
                <p className="mt-0.5 text-[11px] text-stone">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REVIEWS
          id="reviews" for anchor link
      ══════════════════════════════════════ */}
      <section id="reviews" className="border-t border-hairline py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 className="font-sans text-xl font-extrabold text-ink">
            Customer Reviews
          </h2>

          {/* Summary row */}
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 lg:gap-16">

            {/* Big rating + bars */}
            <div className="shrink-0">
              <div className="flex items-end gap-3">
                <span className="font-sans text-5xl font-extrabold text-ink">{avgRating}</span>
                <div className="mb-1">
                  <StarRow n={5} />
                  <p className="mt-1 text-xs text-stone">{reviewCount} reviews</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <RatingBar label="5 ★" pct={80} />
                <RatingBar label="4 ★" pct={13} />
                <RatingBar label="3 ★" pct={5} />
                <RatingBar label="2 ★" pct={2} />
                <RatingBar label="1 ★" pct={0} />
              </div>
            </div>

            {/* Review cards */}
            <div className="flex flex-col gap-5 flex-1">
              {REVIEWS.map((r) => (
                <article key={r.id} className="rounded border border-hairline bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f2ed] font-sans text-[11px] font-extrabold text-stone">
                        {r.initials}
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-ink">{r.name}</p>
                        <p className="text-[10px] text-stone">{r.city}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StarRow n={r.rating} />
                      <span className="text-[10px] text-stone">{r.date}</span>
                    </div>
                  </div>
                  {r.verified && (
                    <span className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-green-700">
                      ✓ Verified Purchase
                    </span>
                  )}
                  <p className="mt-2 text-[13px] leading-6 text-stone">&ldquo;{r.text}&rdquo;</p>
                </article>
              ))}

              <p className="text-center text-xs text-stone">
                Own this piece?{" "}
                <Link
                  href="/contact"
                  className="font-bold text-ink underline underline-offset-2 hover:text-[#c9a227]"
                >
                  Share your experience
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RELATED WATCHES
      ══════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="border-t border-hairline bg-white py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-sans text-xl font-extrabold text-ink">
                From the {product.collection.name} Collection
              </h2>
              <Link
                href={`/collections/${product.collection.slug}`}
                className="text-[12px] font-bold uppercase tracking-widest text-[#c9a227] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((rel) => {
                const ri = JSON.parse(rel.images) as string[];
                return (
                  <article key={rel.id} className="group rounded border border-hairline bg-[#faf8f4] overflow-hidden transition-shadow hover:shadow-md">
                    <div className="relative bg-[#f5f2ed]" style={{ aspectRatio: "1/1" }}>
                      <Link href={`/watches/${rel.slug}`} aria-label={rel.name}>
                        <Image
                          src={ri[0]}
                          alt={rel.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-contain object-top p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </Link>
                      <div className="absolute right-2 top-2 flex flex-col gap-1">
                        <WishlistButton
                          product={{ productId: rel.id, slug: rel.slug, name: rel.name, priceCents: rel.priceCents, image: ri[0] }}
                        />
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone/60">
                        {rel.collection.name}
                      </p>
                      <h3 className="mt-1 font-sans text-sm font-bold text-ink leading-snug line-clamp-2 transition-colors group-hover:text-[#c9a227]">
                        {rel.name}
                      </h3>
                      <p className="mt-2 font-sans text-base font-extrabold text-ink">
                        {formatPriceCents(rel.priceCents)}
                      </p>
                      <div className="mt-3">
                        <RelatedAddToCart
                          product={{ productId: rel.id, slug: rel.slug, name: rel.name, priceCents: rel.priceCents, image: ri[0] }}
                        />
                      </div>
                    </div>
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
