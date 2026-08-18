import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function FeaturedCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="border-t border-hairline bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">The Collections</span>
            <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
              Four families. One standard.
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden shrink-0 cursor-pointer border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold hover:text-gold sm:block"
          >
            View All Collections
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group flex cursor-pointer flex-col bg-background p-8 transition-colors hover:bg-card"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src={collection.heroImage}
                  alt={`${collection.name} collection`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-serif text-xl text-foreground">{collection.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
                {collection.description}
              </p>
              <span className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
