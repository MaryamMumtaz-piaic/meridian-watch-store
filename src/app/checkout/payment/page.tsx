"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";
import { useCart, cartCount } from "@/lib/store/cart";
import { useCheckout } from "@/lib/store/checkout";
import { Container, Section } from "@/components/ui/section";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { Field, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  cardName: z.string().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s+/g, ""))
    .pipe(z.string().regex(/^\d{13,19}$/, "Enter a valid card number")),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter a valid security code"),
});

type FormValues = z.infer<typeof schema>;

export default function PaymentPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const shipping = useCheckout((s) => s.shipping);
  const setPaymentComplete = useCheckout((s) => s.setPaymentComplete);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!mounted) return;
    if (cartCount(lines) === 0) router.replace("/cart");
    else if (!shipping) router.replace("/checkout/shipping");
  }, [mounted, lines, shipping, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    setPaymentComplete(values.cardNumber.slice(-4));
    router.push("/checkout/review");
  }

  if (!mounted || !shipping) return null;

  return (
    <Section className="pt-[calc(var(--header-height)+2.5rem)]">
      <Container className="max-w-xl">
        <CheckoutSteps current="payment" />

        <h1 className="mt-10 font-display text-3xl text-ink">Payment</h1>
        <p className="mt-3 flex items-center gap-2 text-xs text-stone-light">
          <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
          This is a demo checkout — no card details are transmitted or
          stored. Use any values that pass the format checks.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-6">
          <Field label="Name on Card" error={errors.cardName?.message}>
            <Input {...register("cardName")} autoComplete="cc-name" />
          </Field>

          <Field label="Card Number" error={errors.cardNumber?.message}>
            <Input
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              {...register("cardNumber")}
              autoComplete="cc-number"
            />
          </Field>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Expiry (MM/YY)" error={errors.expiry?.message}>
              <Input
                placeholder="12/29"
                {...register("expiry")}
                autoComplete="cc-exp"
              />
            </Field>
            <Field label="CVC" error={errors.cvc?.message}>
              <Input
                inputMode="numeric"
                placeholder="123"
                {...register("cvc")}
                autoComplete="cc-csc"
              />
            </Field>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            disabled={isSubmitting}
            className="mt-4"
          >
            Review Order
          </Button>
        </form>
      </Container>
    </Section>
  );
}
