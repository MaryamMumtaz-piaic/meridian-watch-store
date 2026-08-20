import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A complete list of all pages on the Maison Temps website.",
};

const SITEMAP_GROUPS = [
  {
    title: "Shop",
    links: [
      { href: "/collections", label: "All Collections" },
      { href: "/watches", label: "All Watches" },
      { href: "/watches?sort=new", label: "New Arrivals" },
      { href: "/watches?sort=best", label: "Best Sellers" },
      { href: "/search", label: "Search" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/cart", label: "Shopping Cart" },
    ],
  },
  {
    title: "The Maison",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/craftsmanship", label: "Craftsmanship" },
      { href: "/journal", label: "The Journal" },
      { href: "/boutiques", label: "Boutiques" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/services", label: "Services & Repair" },
      { href: "/services#warranty", label: "Warranty" },
      { href: "/services#authentication", label: "Authentication" },
      { href: "/services#engraving", label: "Engraving" },
      { href: "/order-tracking", label: "Track My Order" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/account", label: "My Account" },
      { href: "/account/login", label: "Sign In" },
      { href: "/account/orders", label: "My Orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <span className="eyebrow">Navigation</span>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">Sitemap</h1>
      <p className="mt-4 text-sm text-stone">
        A complete overview of every page on the Maison Temps website.
      </p>

      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {SITEMAP_GROUPS.map(({ title, links }) => (
          <div key={title}>
            <h2 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {title}
            </h2>
            <ul className="space-y-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-gold"
                  >
                    <span className="h-px w-3 shrink-0 bg-hairline transition-colors group-hover:bg-gold" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
