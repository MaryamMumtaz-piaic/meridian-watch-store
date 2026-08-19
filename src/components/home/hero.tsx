import { prisma } from "@/lib/prisma";
import { HeroSlider, type HeroSlide } from "@/components/home/hero-slider";

/** Curated hero photography — cycles alongside the editorial copy, independent of each product's catalog images. */
const HERO_IMAGES = ["/hero/1.jpeg", "/hero/2.png", "/hero/3.png", "/hero/4.png", "/hero/5.png"];

export async function Hero() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { collection: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const slides: HeroSlide[] = products.map((product, index) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    collectionName: product.collection.name,
    caseSize: product.caseSize,
    priceCents: product.priceCents,
    image: HERO_IMAGES[index % HERO_IMAGES.length],
  }));

  return <HeroSlider slides={slides} />;
}
