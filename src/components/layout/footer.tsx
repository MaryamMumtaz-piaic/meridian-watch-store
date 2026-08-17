import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Container } from "@/components/ui/section";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/components/layout/social-icons";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.14em]">
              MERIDIAN
            </p>
            <p className="mt-2 text-[0.5625rem] tracking-[0.42em] text-cream/45">
              SAN FRANCISCO · EST. {site.established}
            </p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-cream/55">
              Precision-engineered smart watches — health intelligence and
              all-day battery, built to disappear on the wrist.
            </p>

            <div className="mt-10">
              <p className="eyebrow mb-4 text-gold-light">Product Updates</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((column) => (
              <div key={column.title}>
                <p className="eyebrow mb-6 text-cream/45">{column.title}</p>
                <ul className="space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-sm text-cream/75 transition-colors hover:text-gold-light"
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

        <div className="mt-20 flex flex-col gap-6 border-t border-cream/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/40">
            © {site.established}–2026 Meridian, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="text-cream/55 transition-colors hover:text-gold-light"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="YouTube"
              className="text-cream/55 transition-colors hover:text-gold-light"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-cream/55 transition-colors hover:text-gold-light"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          <p className="text-xs text-cream/40">
            {site.phone} · {site.email}
          </p>
        </div>
      </Container>
    </footer>
  );
}
