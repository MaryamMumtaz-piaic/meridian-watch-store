import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";

const SHOP_LINKS = [
  { href: "/collections",        label: "All Collections" },
  { href: "/watches",            label: "All Watches" },
  { href: "/watches?sort=new",   label: "New Arrivals" },
  { href: "/watches?sort=best",  label: "Best Sellers" },
  { href: "/wishlist",           label: "Wishlist" },
  { href: "/cart",               label: "Shopping Cart" },
  { href: "/search",             label: "Search" },
];

const MAISON_LINKS = [
  { href: "/about",         label: "Our Story" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal",       label: "Journal" },
  { href: "/boutiques",     label: "Boutiques" },
];

const SUPPORT_LINKS = [
  { href: "/contact",                   label: "Contact Us" },
  { href: "/faq",                       label: "FAQ" },
  { href: "/services",                  label: "Services & Repair" },
  { href: "/services#warranty",         label: "Warranty" },
  { href: "/services#authentication",   label: "Authentication" },
  { href: "/services#engraving",        label: "Engraving" },
  { href: "/checkout/shipping",         label: "Track My Order" },
];

const LEGAL_LINKS = [
  { href: "/terms",             label: "Terms of Service" },
  { href: "/privacy",           label: "Privacy Policy" },
  { href: "/shipping-returns",  label: "Shipping & Returns" },
  { href: "/cookies",           label: "Cookie Policy" },
  { href: "/accessibility",     label: "Accessibility" },
  { href: "/sitemap",           label: "Sitemap" },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    heading: "Free Insured Shipping",
    sub: "On every order, worldwide",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    heading: "5-Year Warranty",
    sub: "Transferable certificate included",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    heading: "30-Day Returns",
    sub: "Hassle-free, no questions asked",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#faf8f4] text-ink border-t border-hairline">

      {/* ══════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════ */}
      <div className="border-b border-hairline bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-hairline px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {TRUST_BADGES.map((item) => (
            <div
              key={item.heading}
              className="flex items-center gap-5 px-0 py-7 sm:px-10 sm:py-9"
            >
              <span className="shrink-0 text-gold">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.heading}</p>
                <p className="mt-0.5 text-xs text-stone">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN FOOTER BODY
      ══════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="group inline-block">
              <span className="font-serif text-2xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-gold">
                MAISON TEMPS
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              A luxury maison dedicated to horological excellence. Every timepiece
              is hand-finished, certified, and built to last a lifetime — and beyond.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                Stay in Time
              </p>
              <p className="mt-2 text-xs text-stone">
                New references and atelier stories, a few times a year.
              </p>
              <NewsletterForm light />
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3">
              {[
                {
                  href: "https://instagram.com",
                  label: "Instagram",
                  icon: <InstagramIcon className="h-[15px] w-[15px]" />,
                },
                {
                  href: "https://facebook.com",
                  label: "Facebook",
                  icon: <FacebookIcon className="h-[15px] w-[15px]" />,
                },
                {
                  href: "https://youtube.com",
                  label: "YouTube",
                  icon: <YoutubeIcon className="h-[15px] w-[15px]" />,
                },
                {
                  href: "https://x.com",
                  label: "X (Twitter)",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  href: "https://pinterest.com",
                  label: "Pinterest",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-hairline bg-white text-stone shadow-sm transition-all hover:border-gold hover:text-gold hover:shadow-md"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Shop ── */}
          <FooterColumn heading="Shop" links={SHOP_LINKS} />

          {/* ── The Maison ── */}
          <FooterColumn heading="The Maison" links={MAISON_LINKS} />

          {/* ── Support ── */}
          <FooterColumn heading="Support" links={SUPPORT_LINKS} />

          {/* ── Legal ── */}
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════ */}
      <div className="border-t border-hairline bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between lg:px-10">

          <p className="text-center text-xs text-stone sm:text-left">
            © {new Date().getFullYear()} Maison Temps. All rights reserved.
            &nbsp;·&nbsp;
            <Link href="/terms"   className="transition-colors hover:text-gold">Terms</Link>
            &nbsp;·&nbsp;
            <Link href="/privacy" className="transition-colors hover:text-gold">Privacy</Link>
            &nbsp;·&nbsp;
            <Link href="/cookies" className="transition-colors hover:text-gold">Cookies</Link>
          </p>

          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "PayPal", "Stripe"].map((pm) => (
              <span
                key={pm}
                className="rounded border border-hairline bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-stone shadow-sm"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-stone transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
