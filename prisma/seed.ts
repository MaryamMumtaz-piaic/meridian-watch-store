import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const COLLECTIONS = [
  {
    slug: "aero",
    name: "Aero",
    description:
      "Lightweight titanium cases, built for the instrument panel. The Aero line pairs pilot-watch legibility with GMT and chronograph complications for people who live across time zones.",
    heroImage: "/product/17.jpg",
    sortOrder: 1,
  },
  {
    slug: "pulse",
    name: "Pulse",
    description:
      "Precision sport chronographs, built to keep time under pressure. Pulse is the collection for the track, the dive deck, and every stopwatch moment in between.",
    heroImage: "/product/21.jpg",
    sortOrder: 2,
  },
  {
    slug: "studio",
    name: "Studio",
    description:
      "Dress watches for the considered wardrobe — round cases, quiet dials, and finishing meant to be looked at closely.",
    heroImage: "/product/12.jpg",
    sortOrder: 3,
  },
  {
    slug: "summit",
    name: "Summit",
    description:
      "Expedition-rated tool watches, engineered for altitude and depth. Summit is built to be worn somewhere further than the office.",
    heroImage: "/product/11.png",
    sortOrder: 4,
  },
];

const PRODUCTS: {
  slug: string;
  name: string;
  collection: string;
  category: string;
  movement: string;
  caseSize: string;
  caseMaterial: string;
  waterResistance: string;
  priceCents: number;
  sku: string;
  featured: boolean;
  description: string;
  images: string[];
}[] = [
  // Aero
  {
    slug: "aero-voyager-40",
    name: "Aero Voyager 40",
    collection: "aero",
    category: "GMT",
    movement: "Automatic GMT",
    caseSize: "40mm",
    caseMaterial: "Two-Tone Stainless Steel",
    waterResistance: "50m",
    priceCents: 480000,
    sku: "MT-AERO-V40",
    featured: true,
    description:
      "A travel-ready dress GMT in two-tone steel — a deep navy dial, a gold-tone bezel, and a bracelet built for the wrist that never quite lands.",
    images: ["/product/17.jpg"],
  },
  {
    slug: "aero-command-41",
    name: "Aero Command 41",
    collection: "aero",
    category: "Field GMT",
    movement: "Automatic GMT",
    caseSize: "41mm",
    caseMaterial: "Gold-Tone Stainless Steel",
    waterResistance: "100m",
    priceCents: 520000,
    sku: "MT-AERO-CMD41",
    featured: false,
    description:
      "A 24-hour military dial and a red GMT hand, cased in gold-tone steel — built to be read fast, in low light, from across a room.",
    images: ["/product/20.png"],
  },
  // Pulse
  {
    slug: "pulse-octane-42",
    name: "Pulse Octane 42",
    collection: "pulse",
    category: "Sport",
    movement: "Automatic",
    caseSize: "42mm",
    caseMaterial: "Gold-Tone Stainless Steel",
    waterResistance: "100m",
    priceCents: 560000,
    sku: "MT-PULSE-OCT42",
    featured: true,
    description:
      "An angular integrated-bracelet sport case with exposed case screws — the boldest silhouette in the Pulse line, finished in gold-tone steel.",
    images: ["/product/21.jpg"],
  },
  {
    slug: "pulse-chronograph-43",
    name: "Pulse Chronograph 43",
    collection: "pulse",
    category: "Chronograph",
    movement: "Automatic Chronograph",
    caseSize: "43mm",
    caseMaterial: "Two-Tone Stainless Steel",
    waterResistance: "100m",
    priceCents: 590000,
    sku: "MT-PULSE-CHR43",
    featured: true,
    description:
      "Three registers, a 24-hour sub-dial, and a lacquer-red chronograph hand — Pulse Chronograph is built for anyone who actually times things.",
    images: ["/product/23.jpg"],
  },
  {
    slug: "pulse-hybrid-44",
    name: "Pulse Hybrid 44",
    collection: "pulse",
    category: "Ana-Digi",
    movement: "Analog-Digital Quartz",
    caseSize: "44mm",
    caseMaterial: "Rose Gold-Tone Stainless Steel",
    waterResistance: "100m",
    priceCents: 470000,
    sku: "MT-PULSE-HYB44",
    featured: false,
    description:
      "An analog-digital hybrid with a forest-green dial and a lap counter built in — the technical end of the Pulse collection.",
    images: ["/product/24.jpg"],
  },
  // Studio
  {
    slug: "studio-meridian-40",
    name: "Studio Meridian 40",
    collection: "studio",
    category: "Dress",
    movement: "Automatic",
    caseSize: "40mm",
    caseMaterial: "Two-Tone Stainless Steel",
    waterResistance: "30m",
    priceCents: 420000,
    sku: "MT-STUDIO-MER40",
    featured: true,
    description:
      "A navy sunray dial under a gold-tone bezel — the watch we'd put on before a meeting that actually matters.",
    images: ["/product/12.jpg"],
  },
  {
    slug: "studio-reserve-39",
    name: "Studio Reserve 39",
    collection: "studio",
    category: "Dress",
    movement: "Automatic Small Seconds",
    caseSize: "39mm",
    caseMaterial: "Two-Tone Stainless Steel",
    waterResistance: "30m",
    priceCents: 450000,
    sku: "MT-STUDIO-RES39",
    featured: false,
    description:
      "A forest-green dial, a single roman numeral, and a small-seconds sub-dial set low — quiet detailing for people who notice quiet detailing.",
    images: ["/product/13.jpg"],
  },
  {
    slug: "studio-sovereign-41",
    name: "Studio Sovereign 41",
    collection: "studio",
    category: "Dress",
    movement: "Automatic Day-Date",
    caseSize: "41mm",
    caseMaterial: "Gold-Tone Stainless Steel",
    waterResistance: "30m",
    priceCents: 720000,
    sku: "MT-STUDIO-SOV41",
    featured: true,
    description:
      "Diamond-set hour markers, a day-date window, and a full gold-tone bracelet — the most formal watch in the Studio line.",
    images: ["/product/15.jpg"],
  },
  {
    slug: "studio-facet-40",
    name: "Studio Facet 40",
    collection: "studio",
    category: "Dress",
    movement: "Automatic",
    caseSize: "40mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "30m",
    priceCents: 380000,
    sku: "MT-STUDIO-FAC40",
    featured: false,
    description:
      "A multi-faceted bezel catches the light the textured dial doesn't need — clean, quiet, and cut like a jewel.",
    images: ["/product/18.png"],
  },
  {
    slug: "studio-aurora-36",
    name: "Studio Aurora 36",
    collection: "studio",
    category: "Dress",
    movement: "Automatic",
    caseSize: "36mm",
    caseMaterial: "Two-Tone Rose Gold Steel",
    waterResistance: "30m",
    priceCents: 810000,
    sku: "MT-STUDIO-AUR36",
    featured: false,
    description:
      "A diamond-set bezel and a rose-gold case on our smallest reference — Studio Aurora is dress-watch jewelry.",
    images: ["/product/19.png"],
  },
  // Summit
  {
    slug: "summit-onyx-42",
    name: "Summit Onyx 42",
    collection: "summit",
    category: "Tool",
    movement: "Automatic Day-Date",
    caseSize: "42mm",
    caseMaterial: "Black-Coated Stainless Steel",
    waterResistance: "100m",
    priceCents: 560000,
    sku: "MT-SUMMIT-ONX42",
    featured: true,
    description:
      "An all-black case with diamond-set hour markers — day-date function, a full bracelet, and a finish that shrugs off scrapes.",
    images: ["/product/11.png"],
  },
  {
    slug: "summit-expedition-43",
    name: "Summit Expedition 43",
    collection: "summit",
    category: "Field",
    movement: "Automatic",
    caseSize: "43mm",
    caseMaterial: "Rose Gold-Tone Steel",
    waterResistance: "100m",
    priceCents: 640000,
    sku: "MT-SUMMIT-EXP43",
    featured: true,
    description:
      "A cushion case built for terrain, not the office — a striped black dial, a red running-seconds hand, and a leather strap that's meant to scuff.",
    images: ["/product/14.jpg", "/product/16.png"],
  },
  {
    slug: "summit-depth-300",
    name: "Summit Depth 300",
    collection: "summit",
    category: "Diver",
    movement: "Automatic Day-Date",
    caseSize: "42mm",
    caseMaterial: "Gold-Tone Stainless Steel",
    waterResistance: "300m",
    priceCents: 610000,
    sku: "MT-SUMMIT-D300",
    featured: false,
    description:
      "A unidirectional dive bezel and full 300m water resistance, cased in gold-tone steel — the depth-rated end of the Summit collection.",
    images: ["/product/22.jpg"],
  },
];

async function main() {
  console.log("Seeding collections...");
  const collectionIds = new Map<string, string>();

  for (const c of COLLECTIONS) {
    const collection = await prisma.collection.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        description: c.description,
        heroImage: c.heroImage,
        sortOrder: c.sortOrder,
      },
      create: c,
    });
    collectionIds.set(c.slug, collection.id);
  }

  console.log("Seeding products...");
  for (const p of PRODUCTS) {
    const collectionId = collectionIds.get(p.collection);
    if (!collectionId) throw new Error(`Unknown collection: ${p.collection}`);

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        collectionId,
        category: p.category,
        description: p.description,
        movement: p.movement,
        caseSize: p.caseSize,
        caseMaterial: p.caseMaterial,
        waterResistance: p.waterResistance,
        priceCents: p.priceCents,
        images: JSON.stringify(p.images),
        stock: 12,
        sku: p.sku,
        featured: p.featured,
      },
      create: {
        slug: p.slug,
        name: p.name,
        collectionId,
        category: p.category,
        description: p.description,
        movement: p.movement,
        caseSize: p.caseSize,
        caseMaterial: p.caseMaterial,
        waterResistance: p.waterResistance,
        priceCents: p.priceCents,
        images: JSON.stringify(p.images),
        stock: 12,
        sku: p.sku,
        featured: p.featured,
      },
    });
  }

  console.log("Removing retired products...");
  const currentSlugs = PRODUCTS.map((p) => p.slug);
  const removed = await prisma.product.deleteMany({
    where: { slug: { notIn: currentSlugs } },
  });

  console.log(`Seeded ${COLLECTIONS.length} collections and ${PRODUCTS.length} products (removed ${removed.count} old products).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
