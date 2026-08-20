"use client";

// To activate: add <CookieBanner /> to src/app/layout.tsx just before </body>
// import { CookieBanner } from "@/components/layout/cookie-banner";

import { useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  // Lazy initializer reads localStorage once on mount — avoids setState-in-effect lint error
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem("cookie-consent");
    } catch {
      return false;
    }
  });

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function manage() {
    localStorage.setItem("cookie-consent", "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[200] bg-ink text-parchment"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="max-w-2xl text-sm leading-relaxed text-parchment/75">
          We use cookies to keep your cart, wishlist, and session active, and to understand
          how our site is used.{" "}
          <Link href="/cookies" className="text-gold-bright underline underline-offset-4 hover:text-gold">
            Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={manage}
            className="cursor-pointer border border-parchment/20 px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-parchment/70 transition-all hover:border-gold hover:text-gold"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={accept}
            className="cursor-pointer border border-gold bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold-bright hover:border-gold-bright"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
