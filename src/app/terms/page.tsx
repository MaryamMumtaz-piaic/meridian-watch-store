import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Maison Temps Terms of Service — governing the use of our website and purchase of our products.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the Maison Temps website (maisontmps.com) or placing an order, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
      "We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms.",
    ],
  },
  {
    title: "2. Products & Pricing",
    content: [
      "All product descriptions, specifications, and pricing are subject to change without notice. We make every effort to display products accurately, however we cannot guarantee that your display accurately reflects true colours or dimensions.",
      "Prices are shown in US Dollars unless otherwise indicated. We reserve the right to refuse or cancel orders where pricing errors have occurred, in which case you will be notified and fully refunded.",
    ],
  },
  {
    title: "3. Orders",
    content: [
      "Placing an order constitutes an offer to purchase. An order is not confirmed until you receive an email confirmation from us. We reserve the right to decline any order at our discretion.",
      "Orders may be modified or cancelled within 2 hours of placement. Once an order has entered fulfilment, changes are no longer possible. Please contact boutique@maisontmps.com immediately if you need to make a change.",
    ],
  },
  {
    title: "4. Returns & Refunds",
    content: [
      "We offer a 30-day return window on unworn items in their original packaging with all documentation. Engraved or customised items are final sale unless delivered defective.",
      "Refunds are processed to the original payment method within 5–7 business days of receiving the returned item. Shipping and handling charges are non-refundable unless the return is due to our error.",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "All content on this website — including text, images, logos, designs, and product photography — is the exclusive property of Maison Temps or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works of any content without express written permission from Maison Temps.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Maison Temps shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services.",
      "Our total liability to you for any claim arising from these terms or your purchase shall not exceed the amount you paid for the product giving rise to the claim.",
    ],
  },
  {
    title: "7. Governing Law",
    content: [
      "These Terms of Service are governed by the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of New York County, New York.",
      "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-xs text-stone">Last updated: January 2026</p>

      <div className="mt-6 border-l-2 border-hairline pl-5 text-sm leading-relaxed text-stone">
        Please read these Terms of Service carefully before using the Maison Temps website or
        placing an order. These terms govern your relationship with us.
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
          Questions about these terms?{" "}
          <a href="/contact" className="text-gold underline underline-offset-4 hover:text-gold-bright">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
