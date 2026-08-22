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


export function Footer() {
  return (
    <footer className="bg-[#faf8f4] text-ink border-t border-hairline">

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
              {/* Instagram — gradient purple/pink */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-[#C13584] shadow-sm transition-all hover:bg-[#C13584] hover:text-white hover:border-[#C13584] hover:shadow-md">
                <InstagramIcon className="h-[16px] w-[16px]" />
              </a>

              {/* Facebook — blue */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-[#1877F2] shadow-sm transition-all hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-md">
                <FacebookIcon className="h-[16px] w-[16px]" />
              </a>

              {/* YouTube — red */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-[#FF0000] shadow-sm transition-all hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-md">
                <YoutubeIcon className="h-[16px] w-[16px]" />
              </a>

              {/* X / Twitter — black */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-[#000000] shadow-sm transition-all hover:bg-[#000000] hover:text-white hover:border-[#000000] hover:shadow-md">
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Pinterest — red */}
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-white text-[#E60023] shadow-sm transition-all hover:bg-[#E60023] hover:text-white hover:border-[#E60023] hover:shadow-md">
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
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
      <div className="border-t-2 border-gold/30 bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-6 sm:flex-row sm:justify-between lg:px-10">

          {/* Copyright + legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
            <span className="text-xs text-parchment/50">
              © {new Date().getFullYear()} Maison Temps. All rights reserved.
            </span>
            <span className="hidden text-parchment/20 sm:inline">|</span>
            <Link href="/terms"             className="text-xs text-parchment/60 transition-colors hover:text-gold-bright">Terms of Service</Link>
            <span className="text-parchment/20">·</span>
            <Link href="/privacy"           className="text-xs text-parchment/60 transition-colors hover:text-gold-bright">Privacy Policy</Link>
            <span className="text-parchment/20">·</span>
            <Link href="/cookies"           className="text-xs text-parchment/60 transition-colors hover:text-gold-bright">Cookies</Link>
            <span className="text-parchment/20">·</span>
            <Link href="/accessibility"     className="text-xs text-parchment/60 transition-colors hover:text-gold-bright">Accessibility</Link>
          </div>

          {/* Payment logos */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="flex h-7 w-12 items-center justify-center rounded border border-white/10 bg-white px-1 shadow-sm">
              <svg viewBox="0 0 780 500" className="h-4 w-auto" aria-label="Visa">
                <path fill="#1A1F71" d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7z"/>
                <path fill="#1A1F71" d="M524.3 157.1c-10.6-3.9-27.1-8.2-47.8-8.2-52.7 0-89.8 26.6-90.1 64.7-.3 28.2 26.5 43.9 46.8 53.3 20.8 9.6 27.8 15.8 27.7 24.4-.1 13.2-16.6 19.2-32 19.2-21.4 0-32.8-3-50.4-10.4l-6.9-3.1-7.5 43.9c12.5 5.5 35.6 10.2 59.6 10.5 56.3 0 92.8-26.3 93.2-67 .2-22.3-14-39.3-44.7-53.3-18.6-9.1-30-15.1-29.9-24.3 0-8.1 9.7-16.8 30.5-16.8 17.4-.3 30 3.5 39.8 7.5l4.8 2.2 7.2-43.6z"/>
                <path fill="#1A1F71" d="M661.4 152.9H618c-13.1 0-22.9 3.6-28.6 16.7l-81.2 185.1h57.4s9.4-24.7 11.5-30.1c6.3 0 62.1.1 70.1.1 1.6 7 6.6 30 6.6 30h50.7l-42.6-201.8zm-67.2 129.9c4.5-11.5 21.8-56.1 21.8-56.1-.3.5 4.5-11.6 7.2-19.1l3.7 17.3s10.4 47.7 12.6 57.9H594.2z"/>
                <path fill="#1A1F71" d="M232.4 152.9l-52.2 133.5-5.6-27.2c-9.7-31.4-40-65.5-73.8-82.5l47.8 171.9 56.6-.1 84.2-195.5-56.2-.1z"/>
                <path fill="#F2AE14" d="M131.4 152.9H46.9l-.7 4c65.5 15.9 108.9 54.4 126.9 100.6l-18.3-88c-3.2-12.3-12.8-16.1-23.4-16.6z"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="flex h-7 w-12 items-center justify-center rounded border border-white/10 bg-white px-1 shadow-sm">
              <svg viewBox="0 0 131.39 86.9" className="h-4 w-auto" aria-label="Mastercard">
                <rect x="48.19" width="35" height="86.9" fill="#ff5f00"/>
                <path d="M51.94 43.45a55.28 55.28 0 0 1 13.75-37.02A43.45 43.45 0 1 0 65.69 80.47a55.28 55.28 0 0 1-13.75-37.02z" fill="#eb001b"/>
                <path d="M131.39 43.45A43.45 43.45 0 0 1 65.69 80.47a55.34 55.34 0 0 0 0-74.04 43.45 43.45 0 0 1 65.7 37.02z" fill="#f79e1b"/>
              </svg>
            </div>

            {/* Amex */}
            <div className="flex h-7 w-12 items-center justify-center rounded border border-white/10 bg-[#016fcf] px-1.5 shadow-sm">
              <svg viewBox="0 0 48 16" className="h-3 w-auto" aria-label="American Express">
                <text x="0" y="13" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="0.5">AMEX</text>
              </svg>
            </div>

            {/* PayPal */}
            <div className="flex h-7 w-14 items-center justify-center rounded border border-white/10 bg-white px-1.5 shadow-sm">
              <svg viewBox="0 0 124 33" className="h-4 w-auto" aria-label="PayPal">
                <path fill="#253B80" d="M46.2 8.4H38c-.5 0-1 .4-1.1.9l-3.2 20.4c-.1.4.2.8.6.8h3.8c.5 0 1-.4 1.1-.9l.9-5.5c.1-.5.5-.9 1.1-.9h2.5c5.2 0 8.2-2.5 9-7.5.4-2.2 0-3.9-1-5.1-1.2-1.3-3.2-2.2-5.5-2.2zm.9 7.4c-.4 2.8-2.6 2.8-4.7 2.8h-1.2l.8-5.2c0-.3.3-.5.6-.5h.5c1.4 0 2.8 0 3.5.8.4.5.5 1.2.5 2.1z"/>
                <path fill="#179BD7" d="M68.8 15.7h-3.8c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.7-1.6-4.5-1.6-4.2 0-7.8 3.2-8.5 7.6-.4 2.2.1 4.3 1.4 5.8 1.1 1.3 2.8 1.9 4.7 1.9 3.4 0 5.3-2.2 5.3-2.2l-.2 1c-.1.4.2.8.6.8h3.5c.5 0 1-.4 1.1-.9l2.1-13.2c0-.5-.2-.8-.6-.3zm-5.4 7.3c-.4 2.2-2.2 3.7-4.4 3.7-1.1 0-2-.4-2.6-1-.6-.7-.8-1.6-.6-2.7.3-2.1 2.2-3.7 4.4-3.7 1.1 0 2 .3 2.6 1 .5.7.7 1.6.6 2.7z"/>
                <path fill="#253B80" d="M90.2 15.7h-3.8c-.4 0-.7.2-.9.5l-5.4 7.9-2.3-7.6c-.1-.5-.6-.8-1-.8h-3.7c-.5 0-.8.5-.6.9l4.3 12.6-4 5.7c-.3.4 0 1 .5 1h3.8c.4 0 .7-.2.9-.5l12.8-18.5c.3-.4 0-1-.6-1.2z"/>
                <path fill="#179BD7" d="M100.8 8.4h-8.2c-.5 0-1 .4-1.1.9L88.3 29.7c-.1.4.2.8.6.8h4c.4 0 .7-.3.7-.6l.9-5.8c.1-.5.5-.9 1.1-.9h2.5c5.2 0 8.2-2.5 9-7.5.4-2.2 0-3.9-1-5.1-1.1-1.3-3.2-2.2-5.3-2.2zm.9 7.4c-.4 2.8-2.6 2.8-4.7 2.8h-1.2l.8-5.2c0-.3.3-.5.6-.5h.5c1.4 0 2.8 0 3.5.8.5.5.6 1.2.5 2.1z"/>
                <path fill="#179BD7" d="M123 15.7h-3.8c-.3 0-.6.2-.6.5l-.2 1-.3-.4c-.8-1.2-2.7-1.6-4.5-1.6-4.2 0-7.8 3.2-8.5 7.6-.4 2.2.1 4.3 1.4 5.8 1.1 1.3 2.8 1.9 4.7 1.9 3.4 0 5.3-2.2 5.3-2.2l-.2 1c-.1.4.2.8.6.8h3.5c.5 0 1-.4 1.1-.9l2.1-13.2c0-.5-.3-.3-.6-.3zm-5.4 7.3c-.4 2.2-2.2 3.7-4.4 3.7-1.1 0-2-.4-2.6-1-.6-.7-.8-1.6-.6-2.7.3-2.1 2.2-3.7 4.4-3.7 1.1 0 2 .3 2.6 1 .6.7.8 1.6.6 2.7z"/>
                <path fill="#253B80" d="M10.7 2.1C9.4.6 7.1 0 4.1 0H-5.2c-.7 0-1.3.5-1.4 1.2L-10 22.5c-.1.5.3 1 .8 1h5.6l1.4-8.9-.1.3c.1-.7.7-1.2 1.4-1.2h2.9c5.7 0 10.1-2.3 11.4-9 0-.2.1-.4.1-.5.4-2.4 0-4-1.8-5.1z" transform="translate(14 4)"/>
              </svg>
            </div>

            {/* Stripe */}
            <div className="flex h-7 w-14 items-center justify-center rounded border border-white/10 bg-white px-1.5 shadow-sm">
              <svg viewBox="0 0 60 25" className="h-3.5 w-auto" aria-label="Stripe">
                <path fill="#635BFF" d="M5.5 9.8C5.5 8 6.8 7.2 9 7.2c3.2 0 7.2 1 10.4 2.7V2.7C16.2 1.4 13 .8 9 .8 3.6.8 0 3.6 0 10c0 9.8 13.4 8.2 13.4 12.4 0 2-1.6 2.7-3.9 2.7-3.4 0-7.8-1.4-11.2-3.3v7.3C1.6 30.3 5.2 31 8.9 31c5.6 0 9.4-2.7 9.4-9.2 0-10.5-12.8-8.8-12.8-12z"/>
                <path fill="#635BFF" d="M60 15.9c0-8.3-4-14.9-11.7-14.9-7.8 0-12.5 6.6-12.5 14.8 0 9.8 5.5 14.7 13.5 14.7 3.9 0 6.8-.9 9.1-2.1V22c-2.3 1.2-4.9 1.9-8.2 1.9-3.2 0-6.1-1.1-6.5-5.2H60c0-.4.1-1.9.1-2.8zm-16.3-3.1c0-3.9 2.4-5.5 4.6-5.5 2.1 0 4.4 1.6 4.4 5.5h-9z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.18em] text-ink">
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
