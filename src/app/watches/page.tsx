import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/section";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getFilterFacets, getProducts, type WatchFilters } from "@/lib/queries";

export const metadata: Metadata = {
  title: "All Watches",
  description:
    "The full Meridian lineup — every watch, across Pulse, Summit, Studio, and Aero.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function parseFilters(sp: Record<string, string | string[] | undefined>) {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const list = (key: string) => get(key)?.split(",").filter(Boolean) ?? [];

  const filters: WatchFilters = {
    collection: list("collection"),
    material: list("material"),
    connectivity: list("connectivity"),
    size: list("size"),
    sort: get("sort"),
    query: get("q"),
  };
  const min = get("min");
  const max = get("max");
  if (min) filters.minCents = Number(min);
  if (max) filters.maxCents = Number(max);
  return filters;
}

export default async function WatchesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);

  const [products, facets] = await Promise.all([
    getProducts(filters),
    getFilterFacets(),
  ]);

  return (
    <>
      <section className="bg-cream-dark pt-[calc(var(--header-height)+3rem)] pb-12">
        <Container>
          <p className="eyebrow text-gold">Shop All</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            The Collection
          </h1>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-24">
        <Suspense>
          <FilterSidebar facets={facets} resultCount={products.length} />
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
