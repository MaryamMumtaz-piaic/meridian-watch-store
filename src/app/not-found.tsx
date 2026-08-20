import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Background 404 text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-serif text-[20vw] font-extrabold leading-none text-gold/[0.06]">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <span className="eyebrow justify-center">Page Not Found</span>

        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Lost in Time.
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-stone">
          The page you&apos;re looking for may have moved, been renamed, or no longer exists.
          Let us guide you back.
        </p>

        {/* Decorative divider */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-hairline" />
          <div className="h-[6px] w-[6px] rotate-45 border border-gold" />
          <div className="h-px w-16 bg-hairline" />
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
          >
            Return Home
          </Link>
          <Link
            href="/watches"
            className="border border-hairline px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
          >
            Browse Watches
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: "/collections", label: "Collections" },
            { href: "/search", label: "Search" },
            { href: "/contact", label: "Contact" },
            { href: "/sitemap", label: "Sitemap" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-stone underline underline-offset-4 hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
