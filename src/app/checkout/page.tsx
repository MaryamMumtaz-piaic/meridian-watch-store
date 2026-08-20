"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ChevronRight, CreditCard, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";
import { createOrder } from "@/app/actions/create-order";

const shippingSchema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  line1: z.string().min(1, "Required"),
  line2: z.string().optional(),
  city: z.string().min(1, "Required"),
  region: z.string().optional(),
  postalCode: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  phone: z.string().optional(),
});

type ShippingValues = z.infer<typeof shippingSchema>;

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Enter a valid card number").max(19),
  expiry: z.string().min(5, "MM/YY"),
  cvc: z.string().min(3, "CVC"),
  nameOnCard: z.string().min(1, "Required"),
});

type PaymentValues = z.infer<typeof paymentSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
        {label}
      </label>
      <input
        {...props}
        className={`w-full border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-stone/50 focus:outline-none focus:ring-1 focus:ring-gold ${
          error ? "border-destructive" : "border-hairline focus:border-gold"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);

  const [step, setStep] = useState<1 | 2>(1);
  const [shippingData, setShippingData] = useState<ShippingValues | null>(null);
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const shippingForm = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: "US" },
  });

  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
  });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-serif text-2xl text-foreground">Your cart is empty.</p>
        <Link
          href="/watches"
          className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  async function onPlaceOrder(paymentValues: PaymentValues) {
    if (!shippingData) return;
    void paymentValues;
    setPlacing(true);
    try {
      const result = await createOrder({
        email: shippingData.email,
        shippingAddress: JSON.stringify({
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          line1: shippingData.line1,
          line2: shippingData.line2,
          city: shippingData.city,
          region: shippingData.region,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
          phone: shippingData.phone,
        }),
        // Only pass productId + quantity — server computes prices from DB
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });
      if ("error" in result) {
        setPlacing(false);
        return;
      }
      clearCart();
      // Include email so the confirmation page can verify ownership without a full auth session
      router.push(
        `/order-confirmation?order=${result.orderNumber}&email=${encodeURIComponent(shippingData.email)}`
      );
    } catch {
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      {/* ── Breadcrumb steps ── */}
      <div className="mb-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em]">
        <span className={step === 1 ? "text-foreground" : "text-stone"}>
          1 · Shipping
        </span>
        <ChevronRight className="h-3 w-3 text-stone" />
        <span className={step === 2 ? "text-foreground" : "text-stone"}>
          2 · Review & Payment
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* ── Left ── */}
        <div>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <form
              onSubmit={shippingForm.handleSubmit((values) => {
                setShippingData(values);
                setStep(2);
              })}
            >
              <h1 className="font-serif text-3xl text-foreground">Contact & Shipping</h1>

              <div className="mt-8 space-y-5">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  {...shippingForm.register("email")}
                  error={shippingForm.formState.errors.email?.message}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="First Name"
                    placeholder="Jane"
                    {...shippingForm.register("firstName")}
                    error={shippingForm.formState.errors.firstName?.message}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Smith"
                    {...shippingForm.register("lastName")}
                    error={shippingForm.formState.errors.lastName?.message}
                  />
                </div>

                <InputField
                  label="Address Line 1"
                  placeholder="123 Main St"
                  {...shippingForm.register("line1")}
                  error={shippingForm.formState.errors.line1?.message}
                />
                <InputField
                  label="Address Line 2 (optional)"
                  placeholder="Apt 4B"
                  {...shippingForm.register("line2")}
                />

                <div className="grid gap-5 sm:grid-cols-3">
                  <InputField
                    label="City"
                    placeholder="New York"
                    {...shippingForm.register("city")}
                    error={shippingForm.formState.errors.city?.message}
                  />
                  <InputField
                    label="State / Region"
                    placeholder="NY"
                    {...shippingForm.register("region")}
                  />
                  <InputField
                    label="Postal Code"
                    placeholder="10001"
                    {...shippingForm.register("postalCode")}
                    error={shippingForm.formState.errors.postalCode?.message}
                  />
                </div>

                <InputField
                  label="Country"
                  placeholder="US"
                  {...shippingForm.register("country")}
                  error={shippingForm.formState.errors.country?.message}
                />
                <InputField
                  label="Phone (optional)"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  {...shippingForm.register("phone")}
                />
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 border border-ink bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
              >
                Continue to Review
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}

          {/* Step 2: Review & Payment */}
          {step === 2 && shippingData && (
            <form onSubmit={paymentForm.handleSubmit(onPlaceOrder)}>
              <div className="mb-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="cursor-pointer text-xs font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold"
                >
                  ← Edit Shipping
                </button>
              </div>

              <h1 className="font-serif text-3xl text-foreground">Review & Payment</h1>

              {/* Shipping summary */}
              <div className="mt-8 border border-hairline p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  Shipping To
                </p>
                <div className="mt-2 text-sm text-stone">
                  <p>
                    {shippingData.firstName} {shippingData.lastName}
                  </p>
                  <p>{shippingData.line1}{shippingData.line2 ? `, ${shippingData.line2}` : ""}</p>
                  <p>
                    {shippingData.city}
                    {shippingData.region ? `, ${shippingData.region}` : ""} {shippingData.postalCode}
                  </p>
                  <p>{shippingData.country}</p>
                </div>
              </div>

              {/* Items review */}
              <div className="mt-6 space-y-4 border border-hairline p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  Your Order
                </p>
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-hairline">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-serif text-foreground">{item.name}</p>
                      <p className="text-stone">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-mono text-sm">
                      {formatPriceCents(item.priceCents * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment */}
              <div className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-stone" />
                  <h2 className="font-serif text-lg text-foreground">Payment Details</h2>
                </div>

                <div className="space-y-5">
                  <InputField
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    {...paymentForm.register("cardNumber")}
                    error={paymentForm.formState.errors.cardNumber?.message}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField
                      label="Expiry (MM/YY)"
                      placeholder="MM/YY"
                      maxLength={5}
                      {...paymentForm.register("expiry")}
                      error={paymentForm.formState.errors.expiry?.message}
                    />
                    <InputField
                      label="CVC"
                      placeholder="•••"
                      maxLength={4}
                      {...paymentForm.register("cvc")}
                      error={paymentForm.formState.errors.cvc?.message}
                    />
                  </div>
                  <InputField
                    label="Name on Card"
                    placeholder="Jane Smith"
                    {...paymentForm.register("nameOnCard")}
                    error={paymentForm.formState.errors.nameOnCard?.message}
                  />
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  <span>Powered by Stripe · 256-bit SSL encrypted</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={placing}
                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 border border-gold bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placing ? "Placing Order…" : `Place Order · ${formatPriceCents(total)}`}
                <Lock className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* ── Order Summary Sidebar ── */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="border border-hairline bg-secondary p-6">
            <h2 className="font-serif text-lg text-foreground">Order Summary</h2>

            <ul className="mt-5 space-y-3 border-b border-hairline pb-5">
              {items.map((item) => (
                <li key={item.productId} className="flex items-start gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-hairline bg-background">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-xs font-medium text-foreground leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-stone">Qty {item.quantity}</p>
                  </div>
                  <p className="shrink-0 font-mono text-xs">
                    {formatPriceCents(item.priceCents * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2.5 border-b border-hairline pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="font-mono">{formatPriceCents(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Shipping</span>
                <span className="font-mono text-gold">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone">Tax (8%)</span>
                <span className="font-mono">{formatPriceCents(tax)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-serif text-base font-semibold">Total</span>
              <span className="font-mono text-lg font-semibold text-foreground">
                {formatPriceCents(total)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
