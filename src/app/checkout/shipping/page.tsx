"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart, cartCount } from "@/lib/store/cart";
import { useCheckout } from "@/lib/store/checkout";
import { Container, Section } from "@/components/ui/section";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { Field, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SHIPPING_METHODS } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  line1: z.string().min(3, "Enter your street address"),
  line2: z.string().optional(),
  city: z.string().min(1, "Enter your city"),
  state: z.string().optional(),
  postalCode: z.string().min(2, "Enter a postal code"),
  country: z.string().min(2, "Enter a country"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ShippingPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const shipping = useCheckout((s) => s.shipping);
  const setShipping = useCheckout((s) => s.setShipping);
  const shippingMethod = useCheckout((s) => s.shippingMethod);
  const setShippingMethod = useCheckout((s) => s.setShippingMethod);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (mounted && cartCount(lines) === 0) router.replace("/cart");
  }, [mounted, lines, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: shipping ?? {
      fullName: "",
      email: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
    },
  });

  function onSubmit(values: FormValues) {
    setShipping(values);
    router.push("/checkout/payment");
  }

  if (!mounted) return null;

  return (
    <Section className="pt-[calc(var(--header-height)+2.5rem)]">
      <Container className="max-w-xl">
        <CheckoutSteps current="shipping" />

        <h1 className="mt-10 font-display text-3xl text-ink">
          Shipping Details
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid gap-6 sm:grid-cols-2"
        >
          <Field label="Full Name" error={errors.fullName?.message} className="sm:col-span-2">
            <Input {...register("fullName")} autoComplete="name" />
          </Field>

          <Field label="Email" error={errors.email?.message} className="sm:col-span-2">
            <Input type="email" {...register("email")} autoComplete="email" />
          </Field>

          <Field label="Address" error={errors.line1?.message} className="sm:col-span-2">
            <Input {...register("line1")} autoComplete="address-line1" />
          </Field>

          <Field label="Apartment, suite, etc. (optional)" className="sm:col-span-2">
            <Input {...register("line2")} autoComplete="address-line2" />
          </Field>

          <Field label="City" error={errors.city?.message}>
            <Input {...register("city")} autoComplete="address-level2" />
          </Field>

          <Field label="State / Province">
            <Input {...register("state")} autoComplete="address-level1" />
          </Field>

          <Field label="Postal Code" error={errors.postalCode?.message}>
            <Input {...register("postalCode")} autoComplete="postal-code" />
          </Field>

          <Field label="Country" error={errors.country?.message}>
            <Input {...register("country")} autoComplete="country-name" />
          </Field>

          <Field label="Phone (optional)" className="sm:col-span-2">
            <Input type="tel" {...register("phone")} autoComplete="tel" />
          </Field>

          <div className="sm:col-span-2">
            <p className="eyebrow mb-4 text-stone">Shipping Method</p>
            <div className="grid gap-3">
              {SHIPPING_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 border px-5 py-4 transition-colors",
                    shippingMethod === method.id
                      ? "border-ink"
                      : "border-ink/15 hover:border-ink/35",
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === method.id}
                      onChange={() => setShippingMethod(method.id)}
                      className="h-3.5 w-3.5 accent-gold-dark"
                    />
                    <span>
                      <span className="block text-sm text-ink">
                        {method.label}
                      </span>
                      <span className="block text-xs text-stone-light">
                        {method.detail}
                      </span>
                    </span>
                  </div>
                  <span className="text-sm tabular-nums text-ink">
                    {method.cents ? formatPrice(method.cents) : "Complimentary"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isSubmitting}
            className="mt-4 sm:col-span-2"
          >
            Continue to Payment
          </Button>
        </form>
      </Container>
    </Section>
  );
}
