"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShippingDetails, ShippingMethodId } from "@/lib/types";

type CheckoutState = {
  shipping: ShippingDetails | null;
  shippingMethod: ShippingMethodId;
  paymentComplete: boolean;
  cardLast4: string | null;
  setShipping: (shipping: ShippingDetails) => void;
  setShippingMethod: (id: ShippingMethodId) => void;
  setPaymentComplete: (last4: string) => void;
  reset: () => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: null,
      shippingMethod: "insured",
      paymentComplete: false,
      cardLast4: null,

      setShipping: (shipping) => set({ shipping }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
      setPaymentComplete: (cardLast4) =>
        set({ paymentComplete: true, cardLast4 }),
      reset: () =>
        set({
          shipping: null,
          shippingMethod: "insured",
          paymentComplete: false,
          cardLast4: null,
        }),
    }),
    { name: "maison-temps-checkout" },
  ),
);
