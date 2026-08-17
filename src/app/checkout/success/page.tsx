import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { getOrderByNumber } from "@/lib/queries";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Order Confirmed" };

type SearchParams = Promise<{ order?: string }>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { order: orderNumber } = await searchParams;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;

  return (
    <Section className="pt-[calc(var(--header-height)+3rem)]">
      <Container className="max-w-xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream">
          <Check className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h1 className="mt-8 font-display text-3xl text-ink sm:text-4xl">
          Thank you{order ? `, ${order.customerName.split(" ")[0]}` : ""}
        </h1>

        {order ? (
          <>
            <p className="mt-4 text-sm text-stone">
              Order <span className="text-ink">{order.orderNumber}</span>{" "}
              placed on {formatDate(order.createdAt)}. A confirmation has
              been sent to {order.email}.
            </p>

            <div className="mt-10 divide-y divide-ink/8 border-y border-ink/8 text-left">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-4 text-sm"
                >
                  <span className="text-ink">
                    {item.quantity} × {item.productName}
                  </span>
                  <span className="tabular-nums text-stone">
                    {formatPrice(item.lineTotalCents)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between font-display text-xl text-ink">
              <span>Total</span>
              <span className="tabular-nums">
                {formatPrice(order.totalCents)}
              </span>
            </div>

            <p className="mt-8 text-sm text-stone">
              Shipping to {order.shipLine1}, {order.shipCity}{" "}
              {order.shipPostalCode}, {order.shipCountry}
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-stone">
            Your order has been placed. Check your inbox for a confirmation
            email.
          </p>
        )}

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/watches" variant="outline">
            Continue Shopping
          </ButtonLink>
          {order ? (
            <ButtonLink href="/account/orders" variant="ghost">
              View Order History
            </ButtonLink>
          ) : null}
        </div>

        <p className="mt-10 text-xs text-stone-light">
          Questions about your order?{" "}
          <Link href="/contact" className="underline hover:text-ink">
            Contact support
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
