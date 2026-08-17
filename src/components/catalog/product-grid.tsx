import { ProductCard } from "@/components/product/product-card";
import type { ProductCardData } from "@/lib/queries";

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-ink/10 px-8 py-24 text-center">
        <p className="font-display text-xl text-ink">No watches match</p>
        <p className="mt-3 max-w-sm text-sm text-stone">
          Try widening your filters, or clear them to see the full
          collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
