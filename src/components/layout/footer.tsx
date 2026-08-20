import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";

const SHOP_LINKS = [
  { href: "/collections",   label: "All Collections" },
  { href: "/watches",       label: "All Watches" },
  { href: "/watches?sort=new",  label: "New Arrivals" },
  { href: "/watches?sort=best", label: "Best Sellers" },
  { href: "/wishlist",      label: "Wishlist" },
  { href: "/cart",          label: "Shopping Cart" },
  { href: "/search",        label: "Search" },
];

const MAISON_LINKS = [
  { href: "/about",         label: "Our Story" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal",       label: "Journal" },
  { href: "/boutiques",     label: "Boutiques" },
];

const SUPPORT_LINKS = [
  { href: "/contact",       label: "Contact Us" },
  { href: "/faq",           label: "FAQ" },
  { href: "/services",      label: "Services & Repair" },
  { href: "/services#warranty",  label: "Warranty" },
  { href: "/services#authentication", label: "Authentication" },
  { href: "/services#engraving",  label: "Engraving" },
  { href: "/checkout/shipping",   label: "Track My Order" },
];

const LEGAL_LINKS = [
  { href: "/terms",             label: "Terms of Service" },
  { href: "/privacy",           label: "Privacy Policy" },
  { href: "/shipping-returns",  label: "Shipping & Returns" },
  { href: "/cookies",           label: "Cookie Policy" },
  { href: "/accessibility",     label: "Accessibility" },
  { href: "/sitemap",           label: "Sitemap" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-parchment">

      {/* ══════════════════════════════════════
          TOP STRIP — brand promise
      ══════════════════════════════════════ */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {[
            { icon: "◈", heading: "Free Insured Shipping", sub: "On every order, worldwide" },
            { icon: "◇", heading: "5-Year Warranty",       sub: "Transferable certificate included" },
            { icon: "◉", heading: "30-Day Returns",        sub: "Hassle-free, no questions asked" },
          ].map((item) => (
            <div
              key={item.heading}
              className="flex items-center gap-4 px-0 py-6 sm:px-8 sm:py-8"
            >
              <span className="shrink-0 text-2xl text-gold/70">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-parchment">{item.heading}</p>
                <p className="mt-0.5 text-xs text-parchment/50">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN FOOTER BODY
      ══════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">

          {/* ── Brand column ── */}
          <div>
            {/* Logo wordmark */}
            <Link href="/" className="group inline-block">
              <span className="font-serif text-2xl font-extrabold tracking-tight text-parchment transition-colors group-hover:text-gold-bright">
                MAISON TEMPS
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/60">
              A luxury maison dedicated to horological excellence. Every timepiece
              is hand-finished, certified, and built to last a lifetime — and beyond.
            </p>

            {/* Newsletter */}
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
                Stay in Time
              </p>
              <p className="mt-2 text-xs text-parchment/50">
                New references and atelier stories, a few times a year.
              </p>
              <NewsletterForm />
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-parchment/60 transition-all hover:border-gold hover:text-gold-bright"
              >
                <InstagramIcon className="h-[15px] w-[15px]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-parchment/60 transition-all hover:border-gold hover:text-gold-bright"
              >
                <FacebookIcon className="h-[15px] w-[15px]" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-parchment/60 transition-all hover:border-gold hover:text-gold-bright"
              >
                <YoutubeIcon className="h-[15px] w-[15px]" />
              </a>
              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-parchment/60 transition-all hover:border-gold hover:text-gold-bright"
              >
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-parchment/60 transition-all hover:border-gold hover:text-gold-bright"
              >
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Shop ── */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
              Shop
            </h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── The Maison ── */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
              The Maison
            </h3>
            <ul className="space-y-3">
              {MAISON_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
              Support
            </h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-bright">
              Legal
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/65 transition-colors hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════ */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 sm:flex-row sm:justify-between lg:px-10">

          {/* Copyright */}
          <p className="text-center text-xs text-parchment/40 sm:text-left">
            © {new Date().getFullYear()} Maison Temps. All rights reserved.
            &nbsp;·&nbsp;
            <Link href="/terms" className="hover:text-gold-bright transition-colors">Terms</Link>
            &nbsp;·&nbsp;
            <Link href="/privacy" className="hover:text-gold-bright transition-colors">Privacy</Link>
            &nbsp;·&nbsp;
            <Link href="/cookies" className="hover:text-gold-bright transition-colors">Cookies</Link>
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "PayPal", "Stripe"].map((pm) => (
              <span
                key={pm}
                className="rounded border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-parchment/40"
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
