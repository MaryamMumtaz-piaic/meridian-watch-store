"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="mt-6 text-sm text-gold-bright">
        You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-sm gap-3">
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
        className="min-w-0 flex-1 border-b border-white/25 bg-transparent px-1 py-2 text-sm text-parchment placeholder:text-parchment/40 focus:border-gold-bright focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer border-b border-gold-bright px-1 py-2 text-xs font-medium uppercase tracking-[0.14em] text-gold-bright transition-opacity hover:opacity-80"
      >
        Subscribe
      </button>
    </form>
  );
}
