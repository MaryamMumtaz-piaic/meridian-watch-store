import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductCard } from "@/components/product/product-card";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDesc,
  };
}

const SPEC_ROWS = (product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>) =>
  [
    ["Reference", product.reference],
    ["Display", product.display],
    ["Chip", product.chip],
    ["Storage", product.storage],
    ["Battery", product.battery],
    ["Sensors", product.sensors],
    ["Connectivity", product.connectivity],
    ["Compatibility", product.compatibility],
    ["Case Size", `${product.caseSize}mm`],
    ["Case Material", product.caseMaterial],
    ["Glass", product.glass],
    ["Band", product.band],
    ["Water Resistance", product.waterResistance],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.collectionId, product.id, 3);
  const primaryImage = product.images[0]?.url ?? "";

  return (
    <>
      <Container className="grid gap-12 pt-[calc(var(--header-height)+2.5rem)] pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
        <Reveal>
          <ProductGallery images={product.images} />
        </Reveal>

        <Reveal delay={80}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-stone">
            <Link href="/watches" className="hover:text-ink">
              Watches
            </Link>
            <span>/</span>
            <Link
              href={`/collections/${product.collection.slug}`}
              className="hover:text-ink"
            >
              {product.collection.name}
            </Link>
          </nav>

          <p className="eyebrow text-gold">{product.collection.name}</p>
          <h1 className="mt-3 font-display text-3xl leading-[1.15] text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-xs tracking-wider text-stone-light">
            {product.reference}
          </p>

          <p className="mt-6 font-display text-2xl tabular-nums text-ink">
            {formatPrice(product.priceCents, product.currency)}
          </p>

          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">
            {product.shortDesc}
          </p>

          <div className="mt-9">
            <AddToCart
              productId={product.id}
              slug={product.slug}
              name={product.name}
              reference={product.reference}
              priceCents={product.priceCents}
              imageUrl={primaryImage}
              caseMaterial={product.caseMaterial}
              stock={product.stock}
            />
            <p className="mt-4 text-xs text-stone-light">
              {product.stock === 0
                ? "Currently unavailable online — a specialist can source this reference for you."
                : product.stock <= 2
                  ? `Only ${product.stock} remaining.`
                  : "In stock — insured delivery in 2–4 business days."}
            </p>
          </div>

          <div className="mt-12 border-t border-ink/10 pt-8">
            <p className="eyebrow mb-5 text-stone">Specification</p>
            <dl className="divide-y divide-ink/8">
              {SPEC_ROWS(product).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 py-3 text-sm"
                >
                  <dt className="text-stone">{label}</dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/boutiques" variant="outline" className="flex-1">
              Try It in Store
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" className="flex-1">
              Warranty &amp; Service
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <Section className="bg-cream-dark">
        <Container>
          <Reveal>
            <p className="eyebrow mb-5 text-gold">The Story</p>
            <p className="max-w-3xl text-[0.9375rem] leading-relaxed whitespace-pre-line text-stone">
              {product.description}
            </p>
          </Reveal>
        </Container>
      </Section>

      {related.length ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="You May Also Consider"
                title={`More from ${product.collection.name}`}
                align="left"
              />
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-8">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
