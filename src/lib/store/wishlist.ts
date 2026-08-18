import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image: string;
};

type WishlistState = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  isSaved: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          return {
            items: exists
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          };
        }),
      isSaved: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "maison-temps-wishlist" }
  )
);

export function useWishlistCount() {
  return useWishlistStore((state) => state.items.length);
}
