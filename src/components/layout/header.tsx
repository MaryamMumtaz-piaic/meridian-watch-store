"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, site } from "@/lib/site";
import { cartCount, useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const lines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const wishlistSlugs = useWishlist((s) => s.slugs);

  // Only the homepage has a full-bleed dark hero for the header to sit over.
  const overlayHero = pathname === "/";
  const transparent = overlayHero && !scrolled && !mobileOpen;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const count = cartCount(lines);
  // The homepage hero is light (cream), so the header stays ink-toned in
  // both states — only the background/border settle in on scroll.
  const iconTone = "text-ink";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 border-b transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          transparent
            ? "border-b-transparent bg-transparent"
            : "border-ink/10 bg-cream/95 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
          {/* Left — reference line: wordmark doubles as the first spec in the ledger */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn("lg:hidden", iconTone)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 transition-colors duration-500 lg:gap-4",
                iconTone,
              )}
            >
              <span className="font-display text-lg leading-none tracking-[0.14em] whitespace-nowrap lg:text-xl">
                MERIDIAN
              </span>
              <span className="h-4 w-px shrink-0 bg-ink/20" />
              <span className="hidden text-[0.5625rem] tracking-[0.32em] whitespace-nowrap opacity-60 sm:inline">
                EST. {site.established} · SAN FRANCISCO
              </span>
            </Link>
          </div>

          {/* Right — nav, then utilities, read like the value columns of the same row */}
          <div className="flex items-center gap-9 lg:gap-11">
            <nav className="hidden items-center gap-8 lg:flex">
              {mainNav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "link-underline eyebrow transition-colors duration-300",
                      iconTone,
                      active && "text-gold",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-5">
              <Link
                href="/search"
                aria-label="Search"
                className={cn("transition-colors hover:text-gold", iconTone)}
              >
                <Search
                  className="h-[1.15rem] w-[1.15rem]"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className={cn(
                  "relative hidden transition-colors hover:text-gold sm:block",
                  iconTone,
                )}
              >
                <Heart
                  className="h-[1.15rem] w-[1.15rem]"
                  strokeWidth={1.5}
                />
                {wishlistSlugs.length > 0 ? (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.5625rem] font-medium text-ink">
                    {wishlistSlugs.length}
                  </span>
                ) : null}
              </Link>
              <Link
                href="/account"
                aria-label="Account"
                className={cn(
                  "hidden transition-colors hover:text-gold sm:block",
                  iconTone,
                )}
              >
                <User className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              </Link>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
                className={cn(
                  "relative cursor-pointer transition-colors hover:text-gold",
                  iconTone,
                )}
              >
                <ShoppingBag
                  className="h-[1.15rem] w-[1.15rem]"
                  strokeWidth={1.5}
                />
                {count > 0 ? (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.5625rem] font-medium text-ink">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-60 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/50 transition-opacity duration-500",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-[86%] max-w-sm bg-cream px-8 py-8 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="font-display text-lg tracking-[0.14em]">
                MERIDIAN
              </span>
              <span className="h-4 w-px bg-ink/20" />
              <span className="text-[0.5625rem] tracking-[0.32em] whitespace-nowrap opacity-60">
                EST. {site.established}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer text-ink hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-12 flex flex-col">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/10 py-5 font-display text-2xl text-ink transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="mt-10 flex flex-col gap-4">
            {[
              { label: "My Account", href: "/account" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Services & Care", href: "/services" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="eyebrow text-stone transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
