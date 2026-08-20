"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/account",
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md border border-hairline bg-white px-8 py-10">
        <span className="eyebrow">Account</span>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Sign In</h1>
        <p className="mt-3 text-sm text-stone">
          New to Maison Temps?{" "}
          <Link
            href="/account/register"
            className="text-gold underline underline-offset-2 hover:text-gold-bright"
          >
            Create account
          </Link>
        </p>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="email">
              Email
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

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="password">
                Password
              </label>
              <Link
                href="/account/reset-password"
                className="text-xs text-stone hover:text-gold"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-hairline" />
          <span className="text-xs text-stone/60">or continue with</span>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/account" })}
          className="mt-4 flex w-full items-center justify-center gap-3 border border-hairline bg-white px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
