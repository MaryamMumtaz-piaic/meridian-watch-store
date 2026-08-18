import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";

const SITEMAP: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { href: "/collections", label: "Collections" },
      { href: "/watches", label: "All Watches" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    heading: "The Maison",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/craftsmanship", label: "Craftsmanship" },
      { href: "/journal", label: "Journal" },
      { href: "/boutiques", label: "Boutiques" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/services", label: "Warranty & Repair" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <span className="eyebrow text-gold-bright">Stay in time</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-parchment">
              Set your time.
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-parchment/70">
              New references, atelier stories, and boutique invitations —
              sent a few times a year, never more.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {SITEMAP.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-parchment/50">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-parchment/80 transition-colors hover:text-gold-bright"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs tracking-wide text-parchment/50">
            © {new Date().getFullYear()} Maison Temps. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="cursor-pointer text-parchment/70 transition-colors hover:text-gold-bright"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="cursor-pointer text-parchment/70 transition-colors hover:text-gold-bright"
            >
              <FacebookIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="cursor-pointer text-parchment/70 transition-colors hover:text-gold-bright"
            >
              <YoutubeIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
