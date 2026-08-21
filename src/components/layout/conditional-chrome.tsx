"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { CookieBanner } from "./cookie-banner";

const AUTH_ROUTES = ["/account/login", "/account/register"];

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "?"));

  return (
    <>
      {!isAuth && <Header />}
      <main className={isAuth ? "flex-1" : "flex-1 pt-20"}>{children}</main>
      {!isAuth && <Footer />}
      {!isAuth && <CookieBanner />}
    </>
  );
}
