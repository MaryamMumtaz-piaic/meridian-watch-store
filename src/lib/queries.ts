import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const productCard = {
  include: {
    collection: { select: { name: true, slug: true } },
    images: { orderBy: { sortOrder: "asc" }, take: 2 },
  },
} satisfies Prisma.ProductDefaultArgs;

export type ProductCardData = Prisma.ProductGetPayload<typeof productCard>;

export type ProductDetail = Prisma.ProductGetPayload<{
  include: {
    collection: true;
    images: { orderBy: { sortOrder: "asc" } };
  };
}>;

export type WatchFilters = {
  collection?: string[];
  material?: string[];
  connectivity?: string[];
  size?: string[];
  minCents?: number;
  maxCents?: number;
  sort?: string;
  query?: string;
};

/** Keywords scanned for in the free-text `connectivity` spec field to build a filter facet. */
const CONNECTIVITY_TAGS = ["Wi-Fi", "GPS", "Cellular"];

const SIZE_BUCKETS: Record<string, { gte?: number; lt?: number }> = {
  "38-40": { gte: 38, lt: 41 },
  "41-44": { gte: 41, lt: 45 },
  "45-plus": { gte: 45 },
};

const SORTS: Record<string, Prisma.ProductOrderByWithRelationInput[]> = {
  featured: [{ isFeatured: "desc" }, { priceCents: "desc" }],
  "price-asc": [{ priceCents: "asc" }],
  "price-desc": [{ priceCents: "desc" }],
  newest: [{ isNew: "desc" }, { createdAt: "desc" }],
  "name-asc": [{ name: "asc" }],
};

export function buildProductWhere(filters: WatchFilters) {
  const where: Prisma.ProductWhereInput = {};
  const and: Prisma.ProductWhereInput[] = [];

  if (filters.collection?.length) {
    and.push({ collection: { slug: { in: filters.collection } } });
  }
  if (filters.material?.length) {
    and.push({ OR: filters.material.map((m) => ({ caseMaterial: m })) });
  }
  if (filters.connectivity?.length) {
    // Connectivity is a free-text spec ("Bluetooth 5.3, Wi-Fi, GPS"), so match
    // on whether the selected keyword appears anywhere in it.
    and.push({
      OR: filters.connectivity.map((c) => ({
        connectivity: { contains: c },
      })),
    });
  }
  if (filters.size?.length) {
    const ranges = filters.size
      .map((s) => SIZE_BUCKETS[s])
      .filter(Boolean)
      .map((range) => ({ caseSize: range }));
    if (ranges.length) and.push({ OR: ranges });
  }
  if (filters.minCents !== undefined || filters.maxCents !== undefined) {
    and.push({
      priceCents: {
        ...(filters.minCents !== undefined ? { gte: filters.minCents } : {}),
        ...(filters.maxCents !== undefined ? { lte: filters.maxCents } : {}),
      },
    });
  }
  if (filters.query) {
    const q = filters.query;
    and.push({
      OR: [
        { name: { contains: q } },
        { reference: { contains: q } },
        { shortDesc: { contains: q } },
        { caseMaterial: { contains: q } },
        { band: { contains: q } },
        { connectivity: { contains: q } },
        { collection: { name: { contains: q } } },
      ],
    });
  }

  if (and.length) where.AND = and;
  return where;
}

export async function getProducts(filters: WatchFilters = {}) {
  return prisma.product.findMany({
    where: buildProductWhere(filters),
    orderBy: SORTS[filters.sort ?? "featured"] ?? SORTS.featured,
    ...productCard,
  });
}

export async function getFeaturedProducts(take = 4) {
  return prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { priceCents: "desc" },
    take,
    ...productCard,
  });
}

export async function getNewArrivals(take = 6) {
  return prisma.product.findMany({
    where: { isNew: true },
    orderBy: { createdAt: "desc" },
    take,
    ...productCard,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      collection: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getRelatedProducts(
  collectionId: string,
  excludeId: string,
  take = 3,
) {
  return prisma.product.findMany({
    where: { collectionId, id: { not: excludeId } },
    take,
    ...productCard,
  });
}

export async function getProductsBySlugs(slugs: string[]) {
  if (!slugs.length) return [];
  return prisma.product.findMany({
    where: { slug: { in: slugs } },
    ...productCard,
  });
}

export async function getCollections() {
  return prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({ where: { slug } });
}

/** Distinct facet values, derived from the catalog rather than hardcoded. */
export async function getFilterFacets(collectionSlug?: string) {
  const scope: Prisma.ProductWhereInput = collectionSlug
    ? { collection: { slug: collectionSlug } }
    : {};

  const [materials, collections, products] = await Promise.all([
    prisma.product.findMany({
      where: scope,
      distinct: ["caseMaterial"],
      select: { caseMaterial: true },
      orderBy: { caseMaterial: "asc" },
    }),
    prisma.collection.findMany({
      orderBy: { sortOrder: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.product.findMany({
      where: scope,
      select: { priceCents: true, connectivity: true },
    }),
  ]);

  const connectivity = CONNECTIVITY_TAGS.filter((tag) =>
    products.some((p) => p.connectivity.includes(tag)),
  );

  const prices = products.map((p) => p.priceCents);

  return {
    materials: materials.map((m) => m.caseMaterial),
    collections,
    connectivity,
    minCents: prices.length ? Math.min(...prices) : 0,
    maxCents: prices.length ? Math.max(...prices) : 0,
    sizeBuckets: [
      { id: "38-40", label: "38 – 40 mm" },
      { id: "41-44", label: "41 – 44 mm" },
      { id: "45-plus", label: "45 mm and above" },
    ],
  };
}

export async function getJournalPosts(take?: number) {
  return prisma.journalPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function getJournalPost(slug: string) {
  return prisma.journalPost.findUnique({ where: { slug } });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
}

export async function getBoutiques() {
  return prisma.boutique.findMany({
    orderBy: [{ isFlagship: "desc" }, { city: "asc" }],
  });
}
