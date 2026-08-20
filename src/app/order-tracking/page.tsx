import type { Metadata } from "next";
import { TrackingForm } from "./_components/tracking-form";

export const metadata: Metadata = {
  title: "Track Your Order",
};

export default function OrderTrackingPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Order Tracking</span>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
        Track Your Order
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        Enter your order number and email address to see the latest status of your timepiece.
      </p>

      <TrackingForm />

      {/* Info strip */}
      <div className="mt-16 grid gap-6 border-t border-hairline pt-12 sm:grid-cols-3">
        {[
          {
            icon: "◈",
            heading: "Free Insured Shipping",
            sub: "Every order ships insured worldwide",
          },
          {
            icon: "◇",
            heading: "Estimated Delivery",
            sub: "5–10 business days for standard orders",
          },
          {
            icon: "◉",
            heading: "Need Help?",
            sub: (
              <a
                href="/contact"
                className="text-gold transition-colors hover:text-gold-bright"
              >
                Contact our concierge
              </a>
            ),
          },
        ].map((item) => (
          <div key={item.heading} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-xl text-gold/70">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.heading}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
