import type { Metadata } from "next";
import { X } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Payment Failed" };

export default function CheckoutFailedPage() {
  return (
    <Section className="pt-[calc(var(--header-height)+3rem)]">
      <Container className="max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink/8 text-ink">
          <X className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">
          We couldn&apos;t place your order
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          Your payment method wasn&apos;t charged. This is usually caused by
          an item going out of stock between checkout steps — please review
          your bag and try again.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/checkout/review" variant="gold">
            Try Again
          </ButtonLink>
          <ButtonLink href="/cart" variant="outline">
            Return to Bag
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
