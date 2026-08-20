"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ResetForm = { email: string };

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();

  async function onSubmit(_: ResetForm) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md border border-hairline bg-white px-8 py-10">
        <span className="eyebrow">Account</span>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Reset Password</h1>
        <p className="mt-3 text-sm text-stone">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {submitted ? (
          <div className="mt-8">
            <div className="flex items-start gap-3 rounded border border-gold/30 bg-gold/5 px-4 py-4">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-foreground">
                If that email is registered, you&apos;ll receive a reset link shortly.
                Check your inbox and spam folder.
              </p>
            </div>
            <Link
              href="/account/login"
              className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
            >
              ← Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                {...register("email", { required: "Email is required" })}
                className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                href="/account/login"
                className="text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-gold"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
