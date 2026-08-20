import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPriceCents } from "@/lib/format";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "text-stone bg-stone/10",
    PAID: "text-gold bg-gold/10",
    FULFILLED: "text-green-700 bg-green-50",
    CANCELLED: "text-red-700 bg-red-50",
    FAILED: "text-red-700 bg-red-50",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${colors[status] ?? "text-stone bg-stone/10"}`}
    >
      {status}
    </span>
  );
}

const TRACKING_STEPS = [
  { label: "Order Placed", key: "PENDING" },
  { label: "Payment Confirmed", key: "PAID" },
  { label: "Dispatched", key: "FULFILLED" },
  { label: "Delivered", key: "DELIVERED" },
];

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  type ShippingAddress = {
    line1?: string;
    line2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    name?: string;
  };

  let shippingAddress: ShippingAddress = {};
  try {
    shippingAddress = JSON.parse(order.shippingAddress) as ShippingAddress;
  } catch {
    // fallback to empty
  }

  const stepOrder = ["PENDING", "PAID", "FULFILLED", "DELIVERED"];
  const currentIdx = stepOrder.indexOf(order.status);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/account/orders"
          className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
        >
          ← Order History
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Order Detail</span>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            #{order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-stone">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Tracking timeline */}
      {order.status !== "CANCELLED" && order.status !== "FAILED" && (
        <div className="mt-10 border border-hairline bg-white p-6">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-stone">
            Order Tracking
          </h2>
          <div className="relative flex items-start justify-between">
            {/* Progress bar */}
            <div className="absolute left-0 right-0 top-3 h-px bg-hairline" />
            <div
              className="absolute left-0 top-3 h-px bg-gold transition-all"
              style={{
                width: `${Math.min(100, (currentIdx / (TRACKING_STEPS.length - 1)) * 100)}%`,
              }}
            />
            {TRACKING_STEPS.map((step, i) => {
              const done = i <= currentIdx;
              return (
                <div key={step.key} className="relative flex flex-col items-center gap-3">
                  <div
                    className={`relative z-10 h-6 w-6 flex items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-gold bg-gold text-white"
                        : "border-hairline bg-white text-stone"
                    }`}
                  >
                    {done ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-hairline" />
                    )}
                  </div>
                  <p
                    className={`max-w-[80px] text-center text-[10px] font-medium uppercase tracking-wide ${
                      done ? "text-gold" : "text-stone/60"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Items */}
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone">
            Items Ordered
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => {
              const images = JSON.parse(item.product.images) as string[];
              return (
                <div
                  key={item.id}
                  className="flex gap-5 border border-hairline bg-white p-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-secondary">
                    <Image
                      src={images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone">
                        {item.product.category} · {item.product.caseSize}
                      </p>
                      <h3 className="mt-0.5 font-serif text-base font-semibold text-foreground">
                        {item.product.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-stone">Qty: {item.quantity}</p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {formatPriceCents(item.priceAtPurchase * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary + address */}
        <div className="space-y-6">
          {/* Totals */}
          <div className="border border-hairline bg-white p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Order Summary
            </h2>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone">Subtotal</dt>
                <dd className="font-mono text-foreground">
                  {formatPriceCents(order.subtotalCents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Shipping</dt>
                <dd className="font-mono text-foreground">
                  {order.shippingCents === 0
                    ? "Free"
                    : formatPriceCents(order.shippingCents)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Tax</dt>
                <dd className="font-mono text-foreground">
                  {formatPriceCents(order.taxCents)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-hairline pt-2.5 font-semibold">
                <dt className="text-foreground">Total</dt>
                <dd className="font-mono text-gold">
                  {formatPriceCents(order.totalCents)}
                </dd>
              </div>
            </dl>
          </div>

          {/* Shipping address */}
          <div className="border border-hairline bg-white p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Shipping Address
            </h2>
            <address className="not-italic text-sm text-foreground leading-relaxed">
              {shippingAddress.name && <p className="font-medium">{shippingAddress.name}</p>}
              {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
              {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
              {(shippingAddress.city || shippingAddress.region) && (
                <p>
                  {[shippingAddress.city, shippingAddress.region]
                    .filter(Boolean)
                    .join(", ")}
                  {shippingAddress.postalCode && ` ${shippingAddress.postalCode}`}
                </p>
              )}
              {shippingAddress.country && <p>{shippingAddress.country}</p>}
            </address>
            {Object.keys(shippingAddress).length === 0 && (
              <p className="text-sm text-stone">Address not available</p>
            )}
          </div>

          {/* Contact */}
          <div className="border border-hairline bg-white p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Contact
            </h2>
            <p className="text-sm text-foreground">{order.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/account/orders"
          className="border border-hairline bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
        >
          ← Back to Orders
        </Link>
        <Link
          href="/contact"
          className="border border-foreground bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold"
        >
          Need Help?
        </Link>
      </div>
    </div>
  );
}
