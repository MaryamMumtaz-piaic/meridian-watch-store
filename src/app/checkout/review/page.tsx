"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cartCount, cartSubtotal, useCart } from "@/lib/store/cart";
import { useCheckout } from "@/lib/store/checkout";
import { calculateTotals, SHIPPING_METHODS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { placeOrder } from "@/app/actions/orders";
import { Container, Section } from "@/components/ui/section";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  const router = useRouter();
  const { lines, clear } = useCart();
  const { shipping, shippingMethod, paymentComplete, cardLast4, reset } =
    useCheckout();
  const [mounted, setMounted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;
    if (cartCount(lines) === 0) router.replace("/cart");
    else if (!shipping) router.replace("/checkout/shipping");
    else if (!paymentComplete) router.replace("/checkout/payment");
  }, [mounted, lines, shipping, paymentComplete, router]);

  if (!mounted || !shipping || !paymentComplete) return null;

  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethod)!;
  const subtotal = cartSubtotal(lines);
  const totals = calculateTotals(subtotal, method.cents);

  async function handlePlaceOrder() {
    setPending(true);
    setError(null);

    const result = await placeOrder({
      lines: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
      shipping: shipping!,
      shippingMethodId: shippingMethod,
    });

    if (!result.ok) {
      setError(result.message);
      setPending(false);
      router.push("/checkout/failed");
      return;
    }

    clear();
    reset();
    router.push(`/checkout/success?order=${result.orderNumber}`);
  }

  return (
    <Section className="pt-[calc(var(--header-height)+2.5rem)]">
      <Container className="max-w-3xl">
        <CheckoutSteps current="review" />

        <h1 className="mt-10 font-display text-3xl text-ink">
          Review Your Order
        </h1>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 text-stone">Ship To</p>
            <p className="text-sm text-ink">{shipping.fullName}</p>
            <p className="text-sm text-stone">{shipping.line1}</p>
            {shipping.line2 ? (
              <p className="text-sm text-stone">{shipping.line2}</p>
            ) : null}
            <p className="text-sm text-stone">
              {shipping.city}
              {shipping.state ? `, ${shipping.state}` : ""}{" "}
              {shipping.postalCode}
            </p>
            <p className="text-sm text-stone">{shipping.country}</p>
            <p className="mt-2 text-sm text-stone">{shipping.email}</p>
          </div>

          <div>
            <p className="eyebrow mb-3 text-stone">Payment</p>
            <p className="text-sm text-ink">Card ending in {cardLast4}</p>
            <p className="mt-6 eyebrow mb-3 text-stone">Shipping Method</p>
            <p className="text-sm text-ink">{method.label}</p>
            <p className="text-xs text-stone-light">{method.detail}</p>
          </div>
        </div>

        <div className="mt-12 divide-y divide-ink/8 border-t border-ink/8">
          {lines.map((line) => (
            <div key={line.productId} className="flex gap-5 py-6">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream-dark">
                <Image
                  src={line.imageUrl}
                  alt={line.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-sm text-ink">{line.name}</p>
                  <p className="mt-1 text-xs text-stone-light">
                    Qty {line.quantity}
                  </p>
                </div>
                <p className="text-sm tabular-nums text-ink">
                  {formatPrice(line.priceCents * line.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2.5 border-t border-ink/8 pt-8">
          <div className="flex justify-between text-sm text-stone">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatPrice(totals.subtotalCents)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-stone">
            <span>Shipping</span>
            <span className="tabular-nums">
              {totals.shippingCents
                ? formatPrice(totals.shippingCents)
                : "Complimentary"}
            </span>
          </div>
          <div className="flex justify-between text-sm text-stone">
            <span>Tax</span>
            <span className="tabular-nums">
              {formatPrice(totals.taxCents)}
            </span>
          </div>
          <div className="flex justify-between pt-2 font-display text-xl text-ink">
            <span>Total</span>
            <span className="tabular-nums">
              {formatPrice(totals.totalCents)}
            </span>
          </div>
        </div>

        {error ? (
          <p className="mt-6 text-sm text-red-700">{error}</p>
        ) : null}

        <Button
          type="button"
          variant="gold"
          size="lg"
          disabled={pending}
          onClick={handlePlaceOrder}
          className="mt-10 w-full"
        >
          {pending ? "Placing Order…" : "Place Order"}
        </Button>
      </Container>
    </Section>
  );
}
