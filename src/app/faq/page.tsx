import type { Metadata } from "next";
import { Search } from "lucide-react";
import { FaqAccordion, type FaqItem } from "./_components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Maison Temps watches, orders, shipping, returns, and services.",
};

const FAQ_CATEGORIES: { title: string; items: FaqItem[] }[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "All orders ship via fully insured express courier. US domestic delivery takes 2–3 business days. International orders arrive within 5–7 business days. A tracking number is emailed once your order dispatches.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes — free insured shipping on every order, worldwide. No minimum purchase required. Every shipment is fully insured up to the item's value.",
      },
      {
        question: "How do I track my order?",
        answer:
          "You'll receive an email with a tracking number once your order ships. You can also track your order at any time via our order tracking page.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. After this window, the order enters fulfilment and changes are no longer possible. Please contact us immediately at boutique@maisontmps.com if you need assistance.",
      },
    ],
  },
  {
    title: "Returns & Warranty",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day hassle-free return policy. Items must be unworn and returned in their original packaging with all certificates and documentation. Engraved or customised pieces are non-returnable.",
      },
      {
        question: "How does the 5-year warranty work?",
        answer:
          "All Maison Temps watches include a 5-year transferable warranty covering manufacturing defects, movement issues, and water resistance. The warranty certificate is included with every purchase and transfers with the watch when sold.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Email returns@maisontmps.com with your order number and reason for return. We'll send a prepaid shipping label within one business day. Once received and inspected, refunds are processed within 5–7 business days.",
      },
    ],
  },
  {
    title: "Products & Authentication",
    items: [
      {
        question: "Are all watches authentic?",
        answer:
          "Yes. Every Maison Temps timepiece comes with a signed certificate of authenticity, serial number documentation, and has been inspected by our in-house horologists before shipping.",
      },
      {
        question: "Do you service watches you didn't sell?",
        answer:
          "Yes, we service any luxury mechanical watch regardless of where it was purchased. Our atelier covers movement overhaul, case refinishing, crystal replacement, and strap fitting.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, PayPal, and Stripe. All transactions are encrypted and processed securely. We do not store payment card details.",
      },
    ],
  },
  {
    title: "Account & Privacy",
    items: [
      {
        question: "Do I need an account to purchase?",
        answer:
          "No — you can complete your purchase as a guest. Creating an account gives you access to order history, saved wishlists, faster checkout, and exclusive member updates.",
      },
      {
        question: "How do you protect my data?",
        answer:
          "We never sell or share your personal data with third parties. Data is encrypted in transit and at rest. You may request deletion of your account and all associated data at any time by contacting boutique@maisontmps.com.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

      {/* ── Hero ── */}
      <div className="mb-14 max-w-2xl">
        <span className="eyebrow">Support</span>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          Everything you need to know about our watches, shipping, returns, and services.
          Can&apos;t find an answer? Reach out to our team.
        </p>
      </div>

      {/* ── Search bar (visual) ── */}
      <div className="mb-14 max-w-lg">
        <div className="flex items-center gap-3 border-b border-hairline pb-3 focus-within:border-gold">
          <Search className="h-4 w-4 shrink-0 text-stone/60" strokeWidth={1.5} />
          <input
            type="search"
            placeholder="Search questions…"
            className="w-full bg-transparent text-sm placeholder:text-stone/50 focus:outline-none"
            aria-label="Search FAQ"
          />
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-hairline" />
              <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {cat.title}
              </h2>
              <div className="h-px flex-1 bg-hairline" />
            </div>
            <FaqAccordion items={cat.items} />
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="mt-20 border-t border-hairline pt-14 text-center">
        <p className="text-sm text-stone">Still have a question?</p>
        <h3 className="mt-2 font-serif text-2xl text-foreground">Speak with the Maison.</h3>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
        >
          Contact Us
        </a>
      </div>

    </div>
  );
}
