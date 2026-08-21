"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Lock,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import type { CartItem } from "@/lib/store/cart";
import { formatPriceCents } from "@/lib/format";

/* ─── Schema ─── */
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

/* ─── Field ─── */
function Field({
  label,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      <input
        {...props}
        className={`w-full border bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-stone/40 focus:outline-none focus:ring-1 focus:ring-gold ${
          error ? "border-destructive" : "border-hairline focus:border-gold"
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
    </div>
  );
}

/* ─── Steps ─── */
function Steps({ step }: { step: 1 | 2 }) {
  const labels = ["Shipping", "Payment"] as const;
  return (
    <nav className="mb-8 hidden sm:block">
      <ol className="flex items-center">
        {labels.map((label, i) => {
          const idx = (i + 1) as 1 | 2;
          const isCurrent = step === idx;
          const isDone = step > idx;
          return (
            <li key={label} className="flex items-center">
              <span
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                  isCurrent ? "text-foreground" : isDone ? "text-gold" : "text-stone/40"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center border text-[10px] ${
                    isCurrent
                      ? "border-foreground bg-foreground text-white"
                      : isDone
                      ? "border-gold bg-gold text-white"
                      : "border-hairline text-stone/40"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx}
                </span>
                {label}
              </span>
              {i < labels.length - 1 && <span className="mx-4 h-px w-10 bg-hairline" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ─── Sidebar ─── */
function OrderSidebar({
  items,
  subtotal,
  tax,
  total,
}: {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <aside className="h-fit lg:sticky lg:top-24">
      <div className="border border-hairline bg-secondary p-5">
        <ul className="space-y-3 border-b border-hairline pb-4">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-hairline bg-background">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-stone text-[9px] font-bold text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{item.name}</p>
              </div>
              <p className="shrink-0 font-mono text-xs tabular-nums">
                {formatPriceCents(item.priceCents * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone">Subtotal</span>
            <span className="font-mono tabular-nums">{formatPriceCents(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone">Shipping</span>
            <span className="font-medium text-gold">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone">Tax (8%)</span>
            <span className="font-mono tabular-nums">{formatPriceCents(tax)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-hairline pt-4">
          <span className="font-serif text-base text-foreground">Total</span>
          <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
            {formatPriceCents(total)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-stone/50">
        <Lock className="h-3 w-3" />
        <span>SSL encrypted · Powered by Stripe</span>
      </div>
    </aside>
  );
}

/* ─── Main ─── */
export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [redirecting, setRedirecting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const subtotal = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const form = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: "US" },
  });

  /* Empty cart */
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-serif text-2xl text-foreground">Your cart is empty.</p>
        <Link
          href="/watches"
          className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Shop Now <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  async function onSubmit(values: ShippingValues) {
    setRedirecting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          shipping: values,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setApiError(data.error ?? "Could not start checkout. Please try again.");
        setRedirecting(false);
        return;
      }

      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch {
      setApiError("Network error. Please try again.");
      setRedirecting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
      <Steps step={1} />

      <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
        {/* ── Shipping form ── */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="font-serif text-2xl text-foreground sm:text-3xl">Shipping Details</h1>

          <div className="mt-6 space-y-4">
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              {...form.register("email")}
              error={form.formState.errors.email?.message}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First Name"
                placeholder="Jane"
                required
                {...form.register("firstName")}
                error={form.formState.errors.firstName?.message}
              />
              <Field
                label="Last Name"
                placeholder="Smith"
                required
                {...form.register("lastName")}
                error={form.formState.errors.lastName?.message}
              />
            </div>
            <Field
              label="Address"
              placeholder="123 Main St"
              required
              {...form.register("line1")}
              error={form.formState.errors.line1?.message}
            />
            <Field
              label="Apartment, suite, etc. (optional)"
              placeholder="Apt 4B"
              {...form.register("line2")}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="City"
                placeholder="New York"
                required
                {...form.register("city")}
                error={form.formState.errors.city?.message}
              />
              <Field
                label="State"
                placeholder="NY"
                {...form.register("region")}
              />
              <Field
                label="ZIP"
                placeholder="10001"
                required
                {...form.register("postalCode")}
                error={form.formState.errors.postalCode?.message}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Country"
                placeholder="US"
                required
                {...form.register("country")}
                error={form.formState.errors.country?.message}
              />
              <Field
                label="Phone (optional)"
                type="tel"
                placeholder="+1 555 000 0000"
                {...form.register("phone")}
              />
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mt-5 flex items-start gap-2.5 border border-destructive/30 bg-red-50 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="text-sm text-destructive">{apiError}</p>
                {apiError.toLowerCase().includes("cart") && (
                  <p className="mt-1 text-xs text-stone">
                    Please go back to{" "}
                    <Link href="/cart" className="underline hover:text-gold">
                      your cart
                    </Link>
                    , remove the item and re-add it from the product page.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={redirecting}
            className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 border border-gold bg-gold py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
          >
            {redirecting ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Redirecting to Stripe…
              </>
            ) : (
              <>
                Continue to Secure Payment
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[11px] text-stone/50">
            You will be redirected to Stripe's secure payment page.
          </p>
        </form>

        {/* ── Sidebar ── */}
        <OrderSidebar items={items} subtotal={subtotal} tax={tax} total={total} />
      </div>
    </div>
  );
}
