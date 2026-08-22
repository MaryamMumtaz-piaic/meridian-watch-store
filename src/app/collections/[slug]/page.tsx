import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { AddToCartButton } from "@/components/home/add-to-cart-button";
import { WishlistButton } from "@/components/home/wishlist-button";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({ where: { slug } });
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description ?? undefined,
  };
}

export async function generateStaticParams() {
  const collections = await prisma.collection.findMany({ select: { slug: true } });
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!collection) notFound();

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden lg:h-[55vh]">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-ink/60" />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-14 lg:px-16 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl">
            <span className="eyebrow text-gold-bright">The Collection</span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-parchment sm:text-5xl lg:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-parchment/75">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header row */}
          <div className="mb-12 flex items-center justify-between gap-4">
            <div>
              <span className="eyebrow">{collection.name}</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                All References
              </h2>
            </div>
            <p className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-stone">
              {collection.products.length} piece{collection.products.length !== 1 ? "s" : ""}
            </p>
          </div>

          {collection.products.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <div className="h-[5px] w-[5px] rotate-45 border border-gold" />
              <p className="font-serif text-2xl text-stone">No pieces in this collection yet.</p>
              <Link
                href="/watches"
                className="mt-2 border-b border-foreground/25 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground hover:border-gold hover:text-gold"
              >
                Browse All Watches
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
              {collection.products.map((product) => {
                const images = JSON.parse(product.images) as string[];
                return (
                  <article key={product.id} className="group cursor-pointer">
                    {/* Image container */}
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
                        {collection.name}&nbsp;·&nbsp;{product.caseSize}
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

      {/* ── Back link ── */}
      <div className="border-t border-hairline py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/collections"
            className="text-xs font-medium uppercase tracking-[0.14em] text-stone hover:text-gold"
          >
            ← All Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
