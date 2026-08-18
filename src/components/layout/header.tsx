"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { Menu, X, Search, Heart, User, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartCount } from "@/lib/store/cart";
import { useWishlistCount } from "@/lib/store/wishlist";
import { WatchMark } from "@/components/home/watch-mark";

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
  { href: "/collections", label: "Collections" },
  { href: "/watches", label: "Watches" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal", label: "Journal" },
  { href: "/boutiques", label: "Boutiques" },
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
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const mounted = useIsMounted();

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

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

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
            className="cursor-pointer lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex cursor-pointer items-center gap-2.5">
            <WatchMark className="h-6 w-6 shrink-0 text-gold" />
            <span className="font-serif text-lg tracking-[0.18em] uppercase sm:text-xl">
              Maison Temps
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 justify-self-center lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.14em] opacity-90 transition-opacity hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="cursor-pointer"
          >
            {searchOpen ? <X className="h-[18px] w-[18px]" /> : <Search className="h-[18px] w-[18px]" />}
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="relative cursor-pointer">
            <Heart className="h-[18px] w-[18px]" />
            {mounted && <IconBadge count={wishlistCount} />}
          </Link>
          <Link href="/account" aria-label="Account" className="cursor-pointer">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative cursor-pointer">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {mounted && <IconBadge count={cartCount} />}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-6 py-6 text-foreground lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-[0.14em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      {searchOpen && (
        <div className="border-t border-border bg-background px-6 py-6 text-foreground lg:px-10">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-2xl items-center gap-4"
          >
            <Search className="h-5 w-5 shrink-0 text-stone" />
            <input
              type="search"
              autoFocus
              placeholder="Search watches, collections…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border-b border-hairline bg-transparent py-2 font-serif text-lg placeholder:text-stone/60 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer text-xs font-medium uppercase tracking-[0.14em] text-gold"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
