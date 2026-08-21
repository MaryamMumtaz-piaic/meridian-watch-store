import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Truck, Award, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { ImageGallery } from "./_components/image-gallery";
import { ProductActions } from "./_components/product-actions";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { collection: true },
  });
  if (!product) return { title: "Watch Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function WatchPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { collection: true },
  });

  if (!product) notFound();

  const images = JSON.parse(product.images) as string[];

  // Related products from same collection
  const related = await prisma.product.findMany({
    where: {
      collectionId: product.collectionId,
      NOT: { id: product.id },
    },
    include: { collection: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const specs = [
    { label: "Movement", value: product.movement },
    { label: "Case Size", value: product.caseSize },
    { label: "Case Material", value: product.caseMaterial },
    { label: "Water Resistance", value: product.waterResistance },
    { label: "SKU", value: product.sku },
  ];

  return (
    <div className="bg-background">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
          <nav className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
            <Link href="/watches" className="hover:text-gold transition-colors">Watches</Link>
            <span>/</span>
            <Link href={`/collections/${product.collection.slug}`} className="hover:text-gold transition-colors">
              {product.collection.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main product section ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image gallery */}
            <div>
              <ImageGallery images={images} name={product.name} />
            </div>

            {/* Right: Product info */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <span className="eyebrow">
                {product.collection.name} · {product.category}
              </span>

              {/* Name */}
              <h1 className="font-serif text-3xl font-bold leading-tight text-foreground lg:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <p className="font-mono text-2xl font-bold text-gold">
                {formatPriceCents(product.priceCents)}
              </p>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-xs font-medium text-stone">
                  {product.stock > 0 ? `In Stock — ${product.stock} available` : "Out of Stock"}
                </span>
              </div>

              {/* Description */}
              <p className="max-w-lg border-l-2 border-gold/40 pl-4 text-sm leading-[1.9] text-stone">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-hairline" />

              {/* Actions */}
              <ProductActions
                product={{
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  priceCents: product.priceCents,
                  image: images[0],
                }}
              />

              {/* Trust badges */}
              <div className="mt-2 grid grid-cols-3 gap-px border border-hairline bg-hairline">
                {[
                  { icon: Truck, label: "Free Insured Shipping" },
                  { icon: Award, label: "5-Year Warranty" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-2 bg-background px-3 py-4 text-center">
                    <badge.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium leading-tight text-stone">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-hairline" />

              {/* Specs */}
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  Specifications
                </h3>
                <dl className="divide-y divide-hairline">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-3">
                      <dt className="text-xs font-medium uppercase tracking-[0.12em] text-stone">
                        {spec.label}
                      </dt>
                      <dd className="text-xs font-medium text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="border-t border-hairline bg-[#f5f1ea] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Related Pieces</span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
                  More from {product.collection.name}
                </h2>
              </div>
              <Link
                href={`/collections/${product.collection.slug}`}
                className="hidden shrink-0 border-b border-foreground/25 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground hover:border-gold hover:text-gold sm:block"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {related.map((rel) => {
                const relImages = JSON.parse(rel.images) as string[];
                return (
                  <article key={rel.id} className="group cursor-pointer">
                    <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary transition-all duration-300 group-hover:border-gold/40 group-hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.13)]">
                      <Link
                        href={`/watches/${rel.slug}`}
                        className="relative block h-full w-full"
                        aria-label={`View ${rel.name}`}
                      >
                        <Image
                          src={relImages[0]}
                          alt={rel.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                        />
                        <div className="absolute inset-0 bg-ink/[0.07] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Link>
                      <WishlistButton
                        product={{
                          productId: rel.id,
                          slug: rel.slug,
                          name: rel.name,
                          priceCents: rel.priceCents,
                          image: relImages[0],
                        }}
                      />
                      <AddToCartButton
                        product={{
                          productId: rel.id,
                          slug: rel.slug,
                          name: rel.name,
                          priceCents: rel.priceCents,
                          image: relImages[0],
                        }}
                      />
                    </div>
                    <Link href={`/watches/${rel.slug}`} className="mt-4 block">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone/70">
                        {rel.collection.name}&nbsp;·&nbsp;{rel.caseSize}
                      </p>
                      <h3 className="mt-1.5 font-serif text-[15px] font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-gold">
                        {rel.name}
                      </h3>
                      <p className="mt-1.5 font-mono text-sm font-semibold text-gold">
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
