import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";
import { AddToCartButton } from "@/components/home/add-to-cart-button";

export async function NewArrivals() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { collection: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow">New Arrivals</span>
          <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
            Just added to the case.
          </h2>
        </div>
        <Link
          href="/watches"
          className="hidden shrink-0 cursor-pointer border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold hover:text-gold sm:block"
        >
          Shop All Watches
        </Link>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const images = JSON.parse(product.images) as string[];
          return (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-secondary transition-colors group-hover:border-gold">
                <Link href={`/watches/${product.slug}`} className="relative block h-full w-full cursor-pointer">
                  <Image
                    src={images[0]}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <AddToCartButton
                  product={{
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    priceCents: product.priceCents,
                    image: images[0],
                  }}
                />
              </div>
              <Link href={`/watches/${product.slug}`} className="cursor-pointer">
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
                      {product.collection.name} · {product.caseSize}
                    </p>
                    <h3 className="mt-1 font-serif text-lg text-foreground">{product.name}</h3>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-foreground">
                    {formatPriceCents(product.priceCents)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
