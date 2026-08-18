import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const UNSPLASH_PARAMS = "?q=80&w=1600&auto=format&fit=crop";

const IMAGES = [
  "https://images.unsplash.com/photo-1758071348980-d1eed770f34f",
  "https://images.unsplash.com/photo-1605143185650-77944b152643",
  "https://images.unsplash.com/photo-1749843205755-f191e6430a4d",
  "https://images.unsplash.com/photo-1605143185597-9fe1a8065fbb",
  "https://images.unsplash.com/photo-1569819969052-83cf0210161d",
  "https://images.unsplash.com/photo-1758887952896-8491d393afe2",
  "https://images.unsplash.com/photo-1631286964587-d0f26936b263",
  "https://images.unsplash.com/photo-1760532466984-39c3eb7f1254",
  "https://images.unsplash.com/photo-1658910453954-6ca847bb7470",
].map((url) => url + UNSPLASH_PARAMS);

function imagesFor(index: number) {
  const a = IMAGES[index % IMAGES.length];
  const b = IMAGES[(index + 3) % IMAGES.length];
  return JSON.stringify([a, b]);
}

const COLLECTIONS = [
  {
    slug: "aero",
    name: "Aero",
    description:
      "Lightweight titanium cases, built for the instrument panel. The Aero line pairs pilot-watch legibility with GMT and chronograph complications for people who live across time zones.",
    heroImage: IMAGES[4],
    sortOrder: 1,
  },
  {
    slug: "pulse",
    name: "Pulse",
    description:
      "Precision sport chronographs, built to keep time under pressure. Pulse is the collection for the track, the dive deck, and every stopwatch moment in between.",
    heroImage: IMAGES[1],
    sortOrder: 2,
  },
  {
    slug: "studio",
    name: "Studio",
    description:
      "Dress watches for the considered wardrobe — round cases, quiet dials, and finishing meant to be looked at closely.",
    heroImage: IMAGES[7],
    sortOrder: 3,
  },
  {
    slug: "summit",
    name: "Summit",
    description:
      "Expedition-rated tool watches, engineered for altitude and depth. Summit is built to be worn somewhere further than the office.",
    heroImage: IMAGES[2],
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
}[] = [
  // Aero
  {
    slug: "aero-slim-40",
    name: "Aero Slim 40",
    collection: "aero",
    category: "Pilot",
    movement: "Automatic",
    caseSize: "40mm",
    caseMaterial: "Grade 5 Titanium",
    waterResistance: "50m",
    priceCents: 420000,
    sku: "MT-AERO-SLIM40",
    featured: true,
    description:
      "A pilot's watch stripped to essentials — a 40mm titanium case, oversized indices, and a movement thin enough to disappear under a cuff.",
  },
  {
    slug: "aero-gmt-42",
    name: "Aero GMT 42",
    collection: "aero",
    category: "Pilot",
    movement: "Automatic GMT",
    caseSize: "42mm",
    caseMaterial: "Grade 5 Titanium",
    waterResistance: "100m",
    priceCents: 510000,
    sku: "MT-AERO-GMT42",
    featured: false,
    description:
      "A second time zone at a glance, for the wrist that crosses more borders than most. Titanium case, sapphire caseback.",
  },
  {
    slug: "aero-air-titanium",
    name: "Aero Air Titanium",
    collection: "aero",
    category: "Pilot",
    movement: "Automatic Chronograph",
    caseSize: "43mm",
    caseMaterial: "Grade 5 Titanium",
    waterResistance: "100m",
    priceCents: 580000,
    sku: "MT-AERO-AIR43",
    featured: false,
    description:
      "The instrument-panel chronograph — bead-blasted titanium, a matte dial, and pushers sized to be read and used without looking twice.",
  },
  {
    slug: "aero-carbon-41",
    name: "Aero Carbon 41",
    collection: "aero",
    category: "Pilot",
    movement: "Automatic",
    caseSize: "41mm",
    caseMaterial: "Forged Carbon",
    waterResistance: "50m",
    priceCents: 460000,
    sku: "MT-AERO-CARBON41",
    featured: false,
    description:
      "Forged carbon over a titanium core — the lightest case in the collection, finished with a matte-black dial for low-glare cockpit legibility.",
  },
  // Pulse
  {
    slug: "pulse-41-aluminum",
    name: "Pulse 41 Aluminum",
    collection: "pulse",
    category: "Chronograph",
    movement: "Automatic Chronograph",
    caseSize: "41mm",
    caseMaterial: "Anodized Aluminum",
    waterResistance: "100m",
    priceCents: 380000,
    sku: "MT-PULSE-AL41",
    featured: true,
    description:
      "A lightweight sport chronograph built for split-second reading — anodized aluminum case, screw-down pushers, unidirectional bezel.",
  },
  {
    slug: "pulse-45-sport",
    name: "Pulse 45 Sport",
    collection: "pulse",
    category: "Chronograph",
    movement: "Automatic Chronograph",
    caseSize: "45mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "200m",
    priceCents: 490000,
    sku: "MT-PULSE-SPORT45",
    featured: true,
    description:
      "The largest case in the Pulse line — built for the track and rated to 200m, with a tachymeter bezel for pace timing.",
  },
  {
    slug: "pulse-se",
    name: "Pulse SE",
    collection: "pulse",
    category: "Chronograph",
    movement: "Automatic",
    caseSize: "42mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "100m",
    priceCents: 430000,
    sku: "MT-PULSE-SE42",
    featured: false,
    description:
      "The three-hand entry point to Pulse — same case architecture, same water resistance, without the chronograph complication.",
  },
  {
    slug: "pulse-racing-44",
    name: "Pulse Racing 44",
    collection: "pulse",
    category: "Chronograph",
    movement: "Automatic Chronograph",
    caseSize: "44mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "100m",
    priceCents: 520000,
    sku: "MT-PULSE-RACE44",
    featured: false,
    description:
      "A perforated strap and a high-contrast dial, built in the language of 1960s motorsport chronographs.",
  },
  // Studio
  {
    slug: "studio-round-42",
    name: "Studio Round 42",
    collection: "studio",
    category: "Dress",
    movement: "Automatic",
    caseSize: "42mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "30m",
    priceCents: 560000,
    sku: "MT-STUDIO-RND42",
    featured: true,
    description:
      "The Studio signature — a round case, a sunburst dial, and hands thinned to a hairline so nothing competes with the time.",
  },
  {
    slug: "studio-ceramic",
    name: "Studio Ceramic",
    collection: "studio",
    category: "Dress",
    movement: "Automatic",
    caseSize: "40mm",
    caseMaterial: "High-Tech Ceramic",
    waterResistance: "30m",
    priceCents: 640000,
    sku: "MT-STUDIO-CER40",
    featured: false,
    description:
      "A ceramic case that won't scratch or fade, finished to the same mirror polish as our steel references.",
  },
  {
    slug: "studio-leather-edition",
    name: "Studio Leather Edition",
    collection: "studio",
    category: "Dress",
    movement: "Hand-Wound",
    caseSize: "38mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "30m",
    priceCents: 490000,
    sku: "MT-STUDIO-LTH38",
    featured: false,
    description:
      "A hand-wound movement in a slim 38mm case, on a hand-burnished calfskin strap — the smallest watch we make.",
  },
  {
    slug: "studio-moonphase",
    name: "Studio Moonphase",
    collection: "studio",
    category: "Dress",
    movement: "Automatic Moonphase",
    caseSize: "40mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "30m",
    priceCents: 820000,
    sku: "MT-STUDIO-MOON40",
    featured: true,
    description:
      "Our only complication watch — a moonphase disc tracking the lunar cycle to within one day per 122 years.",
  },
  // Summit
  {
    slug: "summit-titanium-49",
    name: "Summit Titanium 49",
    collection: "summit",
    category: "Diver",
    movement: "Automatic",
    caseSize: "49mm",
    caseMaterial: "Grade 5 Titanium",
    waterResistance: "300m",
    priceCents: 790000,
    sku: "MT-SUMMIT-TI49",
    featured: true,
    description:
      "Our largest case, built for altitude and depth alike — titanium construction, a helium escape valve, and a 300m rating.",
  },
  {
    slug: "summit-carbon",
    name: "Summit Carbon",
    collection: "summit",
    category: "Diver",
    movement: "Automatic",
    caseSize: "44mm",
    caseMaterial: "Forged Carbon",
    waterResistance: "200m",
    priceCents: 610000,
    sku: "MT-SUMMIT-CARB44",
    featured: false,
    description:
      "Forged carbon fiber over a steel core, rated to 200m — the toughest, lightest case we build.",
  },
  {
    slug: "summit-expedition",
    name: "Summit Expedition",
    collection: "summit",
    category: "Diver",
    movement: "Automatic GMT",
    caseSize: "46mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "200m",
    priceCents: 720000,
    sku: "MT-SUMMIT-EXP46",
    featured: false,
    description:
      "A GMT complication built for the field, not the office — a 24-hour bezel, a snowflake hour hand, and a case built to take a hit.",
  },
  {
    slug: "summit-depth-300",
    name: "Summit Depth 300",
    collection: "summit",
    category: "Diver",
    movement: "Automatic",
    caseSize: "42mm",
    caseMaterial: "Stainless Steel",
    waterResistance: "300m",
    priceCents: 570000,
    sku: "MT-SUMMIT-D300",
    featured: false,
    description:
      "The entry point to Summit — a true dive watch at 42mm, unidirectional bezel, and full 300m water resistance.",
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
  for (const [index, p] of PRODUCTS.entries()) {
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
        images: imagesFor(index),
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
        images: imagesFor(index),
        stock: 12,
        sku: p.sku,
        featured: p.featured,
      },
    });
  }

  console.log(`Seeded ${COLLECTIONS.length} collections and ${PRODUCTS.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
