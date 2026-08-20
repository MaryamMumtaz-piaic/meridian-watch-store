import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Free insured worldwide shipping on every Maison Temps order. 30-day hassle-free returns.",
};

const SHIPPING_TABLE = [
  { region: "US Domestic", method: "FedEx Priority Overnight", timeframe: "2–3 days" },
  { region: "Canada", method: "DHL Express", timeframe: "3–5 days" },
  { region: "Europe", method: "DHL Express", timeframe: "3–5 days" },
  { region: "Middle East & Asia", method: "FedEx International Priority", timeframe: "5–7 days" },
  { region: "Rest of World", method: "FedEx International Economy", timeframe: "5–7 days" },
];

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

      {/* ── Header ── */}
      <div className="mb-16">
        <span className="eyebrow">Policies</span>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone">
          Every Maison Temps order ships free, fully insured, with end-to-end tracking.
          Returns are hassle-free — no questions asked.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

        {/* ══ SHIPPING ══ */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-2xl text-gold/70">◈</span>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Shipping</h2>
          </div>

          <div className="mb-8 flex items-start gap-3 border-l-2 border-gold pl-4">
            <p className="text-sm text-stone leading-relaxed">
              <strong className="text-foreground font-semibold">Free insured shipping on every order</strong> —
              no minimum, no exceptions, worldwide.
            </p>
          </div>

          {/* Shipping table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-hairline">
                  {["Region", "Carrier & Method", "Timeframe"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-stone"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {SHIPPING_TABLE.map(({ region, method, timeframe }) => (
                  <tr key={region}>
                    <td className="py-4 pr-4 text-sm font-medium text-foreground">{region}</td>
                    <td className="py-4 pr-4 text-sm text-stone">{method}</td>
                    <td className="py-4 font-mono text-sm text-foreground">{timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 border border-hairline bg-[#f5f1ea] p-6">
            <h3 className="font-serif text-base font-semibold text-foreground">Insurance & Packaging</h3>
            <ul className="space-y-2">
              {[
                "All shipments are fully insured up to the item's purchase value",
                "Orders are dispatched in our branded, tamper-evident packaging",
                "Signature required on delivery — for your security",
                "Tracking updates are sent via email at each stage",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-stone">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══ RETURNS ══ */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-2xl text-gold/70">◉</span>
            <h2 className="font-serif text-2xl font-semibold text-foreground">Returns</h2>
          </div>

          <div className="mb-8 flex items-start gap-3 border-l-2 border-gold pl-4">
            <p className="text-sm text-stone leading-relaxed">
              <strong className="text-foreground font-semibold">30-day hassle-free returns</strong> —
              if you&apos;re not completely satisfied, we&apos;ll make it right.
            </p>
          </div>

          {/* Eligibility */}
          <div className="mb-8 space-y-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">Eligibility</h3>
            <ul className="space-y-2">
              {[
                "Item must be unworn and in original condition",
                "All original packaging, box, and certificates must be included",
                "Return must be initiated within 30 days of delivery",
                "Proof of purchase is required",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-stone">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* How to return — steps */}
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">How to Return</h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Contact Us", desc: "Email returns@maisontmps.com with your order number and reason for return." },
              { step: "2", title: "Receive Label", desc: "We'll email a prepaid, tracked return shipping label within one business day." },
              { step: "3", title: "Ship & Refund", desc: "Drop off the package and your refund is processed within 5–7 business days of receipt." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-gold text-xs font-bold text-white">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-stone">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Non-returnable */}
          <div className="mt-8 border border-hairline p-5">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">Non-Returnable Items</h3>
            <p className="text-sm text-stone">
              Engraved, resized, or otherwise customised pieces cannot be returned unless
              they arrive defective. Custom orders are also final sale.
            </p>
          </div>
        </div>

      </div>

      {/* ── Bottom CTA ── */}
      <div className="mt-20 border-t border-hairline pt-12 text-center">
        <p className="text-sm text-stone">Questions about your order?</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
          >
            Contact Support
          </Link>
          <Link
            href="/order-tracking"
            className="inline-flex items-center border border-hairline px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
          >
            Track My Order
          </Link>
        </div>
      </div>

    </div>
  );
}
