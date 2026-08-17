import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  boutiques,
  collections,
  journalPosts,
  products,
} from "./seed-data";

const prisma = new PrismaClient();

const IMAGE_VIEWS = [
  { suffix: "1", view: "front display" },
  { suffix: "2", view: "screen detail" },
  { suffix: "3", view: "case profile" },
  { suffix: "4", view: "band detail" },
];

async function main() {
  console.log("Clearing existing data…");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.journalPost.deleteMany();
  await prisma.boutique.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding collections…");
  const collectionIds = new Map<string, string>();
  for (const c of collections) {
    const created = await prisma.collection.create({
      data: {
        name: c.name,
        slug: c.slug,
        tagline: c.tagline,
        description: c.description,
        heroImage: `/images/collections/${c.slug}.svg`,
        sortOrder: c.sortOrder,
      },
    });
    collectionIds.set(c.slug, created.id);
  }

  console.log("Seeding products…");
  for (const p of products) {
    const collectionId = collectionIds.get(p.collection);
    if (!collectionId) throw new Error(`Unknown collection: ${p.collection}`);

    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        reference: p.reference,
        sku: p.sku,
        collectionId,
        shortDesc: p.shortDesc,
        description: p.description,
        display: p.display,
        chip: p.chip,
        storage: p.storage,
        battery: p.battery,
        sensors: p.sensors,
        connectivity: p.connectivity,
        compatibility: p.compatibility,
        caseSize: p.caseSize,
        caseMaterial: p.caseMaterial,
        glass: p.glass,
        band: p.band,
        waterResistance: p.waterResistance,
        priceCents: p.priceCents,
        stock: p.stock,
        isFeatured: p.isFeatured,
        isNew: p.isNew,
        images: {
          create: IMAGE_VIEWS.map((v, index) => ({
            url: `/images/watches/${p.slug}-${v.suffix}.svg`,
            alt: `${p.name} — ${v.view}`,
            sortOrder: index,
          })),
        },
      },
    });
  }

  console.log("Seeding journal…");
  // Fixed base date keeps published ordering stable across re-seeds.
  const journalBase = new Date("2026-07-01T09:00:00Z");
  for (const [index, post] of journalPosts.entries()) {
    await prisma.journalPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: `/images/journal/${post.slug}.svg`,
        category: post.category,
        author: post.author,
        readMinutes: post.readMinutes,
        publishedAt: new Date(journalBase.getTime() - index * 6 * 86400000),
      },
    });
  }

  console.log("Seeding boutiques…");
  for (const b of boutiques) {
    await prisma.boutique.create({
      data: { ...b, image: `/images/boutiques/${b.slug}.svg` },
    });
  }

  console.log("Seeding demo accounts…");
  const adminPassword = await bcrypt.hash("admin1234", 10);
  const customerPassword = await bcrypt.hash("client1234", 10);

  await prisma.user.create({
    data: {
      name: "Maryam Mumtaz",
      email: "admin@meridian.example",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Amara Osei",
      email: "client@meridian.example",
      passwordHash: customerPassword,
      role: Role.CUSTOMER,
      addresses: {
        create: {
          label: "Home",
          fullName: "Amara Osei",
          line1: "48 Bedford Square",
          city: "London",
          postalCode: "WC1B 3DP",
          country: "United Kingdom",
          phone: "+44 20 7555 0100",
          isDefault: true,
        },
      },
    },
  });

  // One historical paid order so the account and admin views aren't empty.
  const summit = await prisma.product.findUniqueOrThrow({
    where: { slug: "summit-titanium-49" },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });
  const address = await prisma.address.findFirstOrThrow({
    where: { userId: customer.id },
  });

  const subtotal = summit.priceCents;
  await prisma.order.create({
    data: {
      orderNumber: "MER-260412-0001",
      userId: customer.id,
      addressId: address.id,
      status: "SHIPPED",
      email: customer.email,
      customerName: customer.name!,
      shipLine1: address.line1,
      shipCity: address.city,
      shipPostalCode: address.postalCode,
      shipCountry: address.country,
      shipPhone: address.phone,
      subtotalCents: subtotal,
      shippingCents: 0,
      taxCents: Math.round(subtotal * 0.08),
      totalCents: subtotal + Math.round(subtotal * 0.08),
      trackingNumber: "MER-EXP-4471902",
      createdAt: new Date("2026-04-12T14:20:00Z"),
      items: {
        create: {
          productId: summit.id,
          productName: summit.name,
          productSlug: summit.slug,
          imageUrl: summit.images[0]?.url,
          reference: summit.reference,
          quantity: 1,
          priceCents: summit.priceCents,
          lineTotalCents: summit.priceCents,
        },
      },
    },
  });

  const counts = {
    collections: await prisma.collection.count(),
    products: await prisma.product.count(),
    images: await prisma.productImage.count(),
    journal: await prisma.journalPost.count(),
    boutiques: await prisma.boutique.count(),
    users: await prisma.user.count(),
    orders: await prisma.order.count(),
  };
  console.log("Seed complete:", counts);
  console.log("Admin login:  admin@meridian.example / admin1234");
  console.log("Client login: client@meridian.example / client1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
