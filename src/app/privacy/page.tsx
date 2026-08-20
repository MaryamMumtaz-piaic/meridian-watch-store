import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Maison Temps Privacy Policy — how we collect, use, and protect your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: [
      "When you create an account or place an order, we collect personal information you provide: name, email address, shipping address, phone number, and payment information. Payment card details are processed securely via Stripe and are never stored on our servers.",
      "We also collect technical information automatically when you visit our website — including IP address, browser type, device identifier, pages visited, and referring URL — through cookies and similar technologies.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    content: [
      "We use your information to process and fulfil orders, send order confirmations and shipping updates, respond to enquiries, and provide customer support. We may send you occasional emails about new collections or services — but only with your consent, and you may unsubscribe at any time.",
      "We use anonymised, aggregated analytics data to understand how our website is used and improve the experience for all visitors. This data cannot be used to identify you individually.",
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      "We never sell your personal data. We share information only with trusted service providers necessary to fulfil your order — including our shipping carriers (FedEx, DHL), payment processor (Stripe), and email platform (Resend). These providers are contractually bound to handle your data securely.",
      "We may disclose information if required by law or to protect the rights and safety of Maison Temps, our customers, or the public.",
    ],
  },
  {
    title: "4. Cookies",
    content: [
      "We use essential cookies to keep your cart and session active, and analytical cookies (Google Analytics) to understand aggregate site usage. Marketing cookies are only set with your explicit consent via our cookie banner.",
      "You can manage your cookie preferences at any time through your browser settings or by revisiting our Cookie Policy page.",
    ],
  },
  {
    title: "5. Your Rights (GDPR & CCPA)",
    content: [
      "If you are in the European Economic Area or California, you have rights over your personal data including: the right to access the data we hold about you, the right to correct inaccurate data, the right to request deletion of your data, and the right to withdraw consent at any time.",
      "To exercise any of these rights, email privacy@maisontmps.com. We will respond within 30 days. There is no charge for most requests.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your account and order data for as long as your account is active, plus 5 years to comply with legal and tax obligations. You may request deletion of your account and associated personal data at any time — subject to legal retention requirements.",
      "Anonymised usage data may be retained indefinitely for analytics purposes as it cannot be used to identify you.",
    ],
  },
  {
    title: "7. Contact",
    content: [
      "Maison Temps is the data controller for personal data collected through this website. For privacy-related enquiries, contact us at privacy@maisontmps.com or by post at: Maison Temps, 580 Fifth Avenue, Suite 2100, New York, NY 10036.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-xs text-stone">Last updated: January 2026</p>

      <div className="mt-6 border-l-2 border-hairline pl-5 text-sm leading-relaxed text-stone">
        Your privacy matters to us. This policy explains what data we collect, why we collect it,
        and how we protect it. We aim to be direct — no legal fog.
      </div>

      <div className="mt-12 space-y-10">
        {SECTIONS.map(({ title, content }) => (
          <div key={title}>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">{title}</h2>
            <div className="space-y-4">
              {content.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-stone">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-hairline pt-8">
        <p className="text-sm text-stone">
          Privacy questions?{" "}
          <a href="mailto:privacy@maisontmps.com" className="text-gold underline underline-offset-4 hover:text-gold-bright">
            privacy@maisontmps.com
          </a>
        </p>
      </div>
    </div>
  );
}
