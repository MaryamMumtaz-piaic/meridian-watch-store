import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Maison Temps is committed to making our website accessible to everyone.",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Accessibility</span>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
        Accessibility Statement
      </h1>
      <p className="mt-3 text-xs text-stone">Last updated: January 2026</p>

      <div className="mt-8 text-sm leading-relaxed text-stone">
        <p>
          Maison Temps is committed to ensuring digital accessibility for everyone — regardless of
          ability or assistive technology. We are continually working to improve the accessibility
          of our website in accordance with the Web Content Accessibility Guidelines (WCAG) 2.1
          Level AA standard.
        </p>
      </div>

      <div className="mt-12 space-y-10">
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Our Commitment</h2>
          <p className="text-sm leading-relaxed text-stone">
            We aim to make our website perceivable, operable, understandable, and robust for all
            users. This is an ongoing effort — we test our website regularly and address identified
            issues as a priority.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Features</h2>
          <ul className="space-y-3">
            {[
              "Keyboard-navigable interface — all interactive elements are reachable via keyboard",
              "Descriptive alt text on all product and editorial images",
              "ARIA labels on icon buttons (cart, wishlist, search, menu)",
              "Logical heading hierarchy on all pages",
              "Sufficient colour contrast ratios across the site",
              "Focus indicators on all interactive elements",
              "Responsive design that works across screen sizes and zoom levels",
              "No auto-playing video or audio content",
              "Form fields with associated labels and error messages",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-stone">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Known Limitations</h2>
          <p className="text-sm leading-relaxed text-stone">
            While we strive for full WCAG 2.1 AA compliance, some older content and third-party
            components may not yet meet all criteria. We prioritise fixing any reported issues
            and appreciate your patience as we continue to improve.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Contact Us About Accessibility</h2>
          <p className="text-sm leading-relaxed text-stone">
            If you encounter an accessibility barrier on our website or need content in an alternative
            format, please contact us and we will respond within 2 business days:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="text-sm text-stone">
              Email:{" "}
              <a
                href="mailto:access@maisontmps.com"
                className="text-gold underline underline-offset-4 hover:text-gold-bright"
              >
                access@maisontmps.com
              </a>
            </li>
            <li className="text-sm text-stone">
              Phone: <a href="tel:+18005550180" className="text-gold underline underline-offset-4 hover:text-gold-bright">+1 (800) 555-0180</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
