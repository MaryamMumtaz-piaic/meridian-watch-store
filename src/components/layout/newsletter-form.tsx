"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeToNewsletter, null);

  return (
    <form action={action} className="max-w-sm">
      <div className="flex items-center gap-3 border-b border-cream/25 pb-3 focus-within:border-gold">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe"
          className="cursor-pointer text-cream transition-colors hover:text-gold disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
      {state ? (
        <p
          className={`mt-3 text-xs ${state.ok ? "text-gold-light" : "text-red-400"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
