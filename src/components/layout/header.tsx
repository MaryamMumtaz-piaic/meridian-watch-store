"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, X, Search, Heart, User, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useCartCount } from "@/lib/store/cart";
import { useWishlistCount } from "@/lib/store/wishlist";
import { WatchMark } from "@/components/home/watch-mark";
import { SearchOverlay } from "./search-overlay";

const emptySubscribe = () => () => {};

/** True only once the component has hydrated on the client — avoids an SSR/client mismatch for persisted store counts. */
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const NAV_LINKS = [
  { href: "/watches", label: "All Watches" },
  { href: "/watches?sort=new", label: "New Arrivals" },
  { href: "/order-tracking", label: "Track Order" },
];

const COLLECTIONS_DROPDOWN = [
  { slug: "aero", label: "Aero", tag: "Aviation-inspired", image: "/product/17.jpg" },
  { slug: "pulse", label: "Pulse", tag: "Sport & Chronograph", image: "/product/21.jpg" },
  { slug: "studio", label: "Studio", tag: "Dress & Formal", image: "/product/12.jpg" },
  { slug: "summit", label: "Summit", tag: "Outdoor & Field", image: "/product/11.png" },
];

function IconBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-mono text-[10px] leading-none text-white">
      {count}
    </span>
  );
}

export function Header() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mounted = useIsMounted();

  const isLoggedIn = status === "authenticated" && !!session;

  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-background/95 text-foreground backdrop-blur transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_12px_0_rgba(28,25,23,0.06)]" : "shadow-none"
      )}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="cursor-pointer text-foreground transition-colors duration-300 hover:text-gold lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="group flex cursor-pointer items-center gap-2.5">
            <WatchMark className="h-6 w-6 shrink-0 text-gold transition-colors duration-300 group-hover:text-gold-bright" />
            <span className="font-serif text-lg tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-gold sm:text-xl">
              Maison Temps
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 justify-self-center lg:flex">
          {/* Collections with mega-dropdown */}
          <div className="group relative">
            <Link
              href="/collections"
              className="flex items-center gap-1 py-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors duration-300 hover:text-gold"
            >
              Collections
              <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
            </Link>

            {/* Dropdown panel */}
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 translate-y-2 border border-hairline bg-background opacity-0 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.14)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              {/* Arrow tip */}
              <div className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-hairline bg-background" />

              <div className="p-5">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-stone">
                  Our Collections
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {COLLECTIONS_DROPDOWN.map((col) => (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      className="group/col flex flex-col"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
                        <Image
                          src={col.image}
                          alt={col.label}
                          fill
                          sizes="130px"
                          className="object-cover transition-transform duration-500 ease-out group-hover/col:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-ink/[0.05] transition-opacity duration-300 group-hover/col:bg-ink/[0.12]" />
                      </div>
                      <div className="mt-2.5">
                        <p className="text-[13px] font-bold text-ink transition-colors duration-200 group-hover/col:text-gold">
                          {col.label}
                        </p>
                        <p className="mt-0.5 text-[10px] text-stone/70">{col.tag}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                  <p className="text-[11px] text-stone/60">Fine mechanical watches, four families</p>
                  <Link
                    href="/collections"
                    className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold transition-opacity hover:opacity-70"
                  >
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="cursor-pointer text-foreground transition-all duration-300 hover:scale-110 hover:text-gold"
          >
            {searchOpen ? <X className="h-[18px] w-[18px]" /> : <Search className="h-[18px] w-[18px]" />}
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative cursor-pointer text-foreground transition-all duration-300 hover:scale-110 hover:text-gold"
          >
            <Heart className="h-[18px] w-[18px]" />
            {mounted && <IconBadge count={wishlistCount} />}
          </Link>
          {/* Auth: show Login+Register when logged out, User icon when logged in */}
          {mounted && isLoggedIn ? (
            <div className="relative group">
              <Link
                href="/account"
                aria-label="My Account"
                className="cursor-pointer text-foreground transition-all duration-300 hover:scale-110 hover:text-gold"
              >
                <User className="h-[18px] w-[18px]" />
              </Link>
              {/* Dropdown on hover */}
              <div className="pointer-events-none absolute right-0 top-full z-50 w-44 translate-y-1 border border-hairline bg-background opacity-0 shadow-lg transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                <div className="px-4 py-3 border-b border-hairline">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone truncate">
                    {session.user?.name ?? session.user?.email ?? "My Account"}
                  </p>
                </div>
                <Link href="/account" className="flex items-center px-4 py-2.5 text-xs text-foreground/80 hover:text-gold hover:bg-secondary transition-colors">
                  Dashboard
                </Link>
                <Link href="/account/orders" className="flex items-center px-4 py-2.5 text-xs text-foreground/80 hover:text-gold hover:bg-secondary transition-colors">
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center px-4 py-2.5 text-xs text-foreground/80 hover:text-gold hover:bg-secondary transition-colors border-t border-hairline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : mounted && !isLoggedIn ? (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/account/login"
                className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-gold"
              >
                Sign In
              </Link>
              <Link
                href="/account/register"
                className="border border-foreground px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:bg-gold hover:text-white"
              >
                Register
              </Link>
            </div>
          ) : (
            /* Loading state — reserve space to avoid layout shift */
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-4 w-12 bg-hairline animate-pulse" />
              <div className="h-7 w-20 bg-hairline animate-pulse" />
            </div>
          )}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative cursor-pointer text-foreground transition-all duration-300 hover:scale-110 hover:text-gold"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {mounted && <IconBadge count={cartCount} />}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-6 py-6 text-foreground lg:hidden">
          {/* Collections + sub-items */}
          <Link
            href="/collections"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:text-gold"
          >
            Collections
          </Link>
          <div className="ml-4 flex flex-col gap-0.5 border-l border-hairline pl-4 pb-2">
            {COLLECTIONS_DROPDOWN.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                onClick={() => setMenuOpen(false)}
                className="py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold"
              >
                {col.label}
              </Link>
            ))}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth links in mobile menu */}
          <div className="mt-3 border-t border-hairline pt-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground hover:text-gold transition-colors"
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); void signOut({ callbackUrl: "/" }); }}
                  className="py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-stone hover:text-gold transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/account/login"
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground hover:text-gold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/account/register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block border border-foreground px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:bg-gold hover:text-white"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
