import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { ProductGrid } from "@/components/catalog/product-grid";
import {
  getCollectionBySlug,
  getFilterFacets,
  getProducts,
  type WatchFilters,
} from "@/lib/queries";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

function parseFilters(sp: Record<string, string | string[] | undefined>) {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const list = (key: string) => get(key)?.split(",").filter(Boolean) ?? [];

  const filters: WatchFilters = {
    material: list("material"),
    connectivity: list("connectivity"),
    size: list("size"),
    sort: get("sort"),
  };
  const min = get("min");
  const max = get("max");
  if (min) filters.minCents = Number(min);
  if (max) filters.maxCents = Number(max);
  return filters;
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const filters = { ...parseFilters(sp), collection: [slug] };

  const [products, facets] = await Promise.all([
    getProducts(filters),
    getFilterFacets(slug),
  ]);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <Container className="relative z-10 pb-16 pt-[var(--header-height)]">
          <Reveal>
            <p className="eyebrow text-gold-light">
              {products.length} References
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-cream/65">
              {collection.description}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
        <Suspense>
          <FilterSidebar
            facets={facets}
            showCollections={false}
            resultCount={products.length}
          />
        </Suspense>

        <div>
          <p className="mb-8 hidden text-xs text-stone lg:block">
            {products.length} {products.length === 1 ? "result" : "results"}
          </p>
          <ProductGrid products={products} />
        </div>
      </Container>
    </>
  );
}
