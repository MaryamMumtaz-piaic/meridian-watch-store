import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach the Maison Temps team for orders, authentication, private consultations, and press inquiries.",
};

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "boutique@maisontmps.com", href: "mailto:boutique@maisontmps.com" },
  { icon: Phone, label: "Phone", value: "+1 (800) 555-0180", href: "tel:+18005550180" },
  { icon: Clock, label: "Hours", value: "Monday–Friday, 9am–6pm EST", href: null },
  { icon: MapPin, label: "Address", value: "580 Fifth Avenue, Suite 2100\nNew York, NY 10036", href: null },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">

      {/* ── Two-column layout ── */}
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

        {/* ── Left — Info ── */}
        <div>
          <span className="eyebrow">Get in Touch</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Contact the Maison
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-stone">
            Whether you have a question about a timepiece, need help with an order,
            or want to arrange a private consultation — our maison team is here
            to assist. We typically respond within one business day.
          </p>

          {/* Divider */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-[3px] w-14 bg-gold" />
            <div className="h-[3px] w-3 bg-gold/30" />
          </div>

          {/* Contact details */}
          <ul className="mt-10 space-y-7">
            {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-hairline text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-sm text-foreground transition-colors hover:text-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 whitespace-pre-line text-sm text-foreground">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Social links */}
          <div className="mt-12">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone">Follow the Maison</p>
            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", href: "https://instagram.com", letter: "Ig" },
                { label: "Facebook", href: "https://facebook.com", letter: "Fb" },
                { label: "Pinterest", href: "https://pinterest.com", letter: "Pt" },
                { label: "X", href: "https://x.com", letter: "X" },
              ].map(({ label, href, letter }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-hairline text-[11px] font-semibold text-stone/70 transition-all hover:border-gold hover:text-gold"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — Form ── */}
        <div>
          <div className="border border-hairline bg-white p-8 sm:p-10">
            <h2 className="mb-8 font-serif text-2xl text-foreground">Send a Message</h2>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
