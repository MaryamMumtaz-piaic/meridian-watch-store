"use server";

import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";

export interface QuickSearchResult {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  collection: string;
  category: string;
}

export async function quickSearch(query: string): Promise<QuickSearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const products = await prisma.product.findMany({
    include: { collection: true },
    orderBy: { name: "asc" },
    take: 50,
  });

  const lower = q.toLowerCase();
  const matched = products.filter((p) => {
    const haystack = `${p.name} ${p.category} ${p.collection.name} ${p.movement ?? ""}`.toLowerCase();
    return haystack.includes(lower);
  });

  return matched.slice(0, 6).map((p) => {
    const images = JSON.parse(p.images as string) as string[];
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: formatPriceCents(p.priceCents),
      image: images[0] ?? "/placeholder.svg",
      collection: p.collection.name,
      category: p.category,
    };
  });
}
