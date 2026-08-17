/** Minimal product shape the client cart needs — snapshotted at add-to-cart time. */
export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  reference: string;
  priceCents: number;
  imageUrl: string;
  caseMaterial: string;
  quantity: number;
  stock: number;
};

export type ShippingDetails = {
  fullName: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
};

export const SHIPPING_METHODS = [
  {
    id: "insured",
    label: "Insured Courier",
    detail: "2–4 business days, signature required",
    cents: 0,
  },
  {
    id: "express",
    label: "Express Overnight",
    detail: "Next business day before 12:00",
    cents: 8500,
  },
] as const;

export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

export const TAX_RATE = 0.08;

export function calculateTotals(
  subtotalCents: number,
  shippingCents: number,
) {
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  return {
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents: subtotalCents + shippingCents + taxCents,
  };
}
