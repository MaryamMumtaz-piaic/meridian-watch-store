"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm({ light = false }: { light?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="mt-6 text-sm text-gold">
        You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex max-w-sm gap-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={[
          "min-w-0 flex-1 border-b px-1 py-2 text-sm focus:outline-none",
          light
            ? "border-hairline bg-transparent text-ink placeholder:text-stone/60 focus:border-gold"
            : "border-white/25 bg-transparent text-parchment placeholder:text-parchment/40 focus:border-gold-bright",
        ].join(" ")}
      />
      <button
        type="submit"
        className={[
          "shrink-0 cursor-pointer border-b px-1 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-75",
          light
            ? "border-gold text-gold"
            : "border-gold-bright text-gold-bright",
        ].join(" ")}
      >
        Subscribe
      </button>
    </form>
  );
}
