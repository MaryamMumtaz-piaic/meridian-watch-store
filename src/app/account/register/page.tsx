"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions/register";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


function EyeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch("password");

  async function onSubmit(data: RegisterForm) {
    setError(null);
    setLoading(true);
    try {
      const result = await registerUser({
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/account/login?registered=1");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[82vh] items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-4xl overflow-hidden border border-hairline bg-white"
        style={{ borderRadius: "1.25rem", boxShadow: "0 4px 32px rgba(28,25,23,0.07), 0 1px 4px rgba(28,25,23,0.04)" }}
      >
        <div className="flex">
          {/* ── Left branded panel ── */}
          <div
            className="relative hidden flex-col overflow-hidden md:flex md:w-[42%]"
            style={{ background: "#ffffff" }}
          >
            <div
              className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full"
              style={{ background: "rgba(201,162,39,0.18)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-8 h-60 w-60 rounded-full"
              style={{ background: "rgba(161,98,7,0.12)" }}
            />

            {/* Brand copy */}
            <div className="relative z-10 p-10 pb-4">
              <span
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: "#b07880" }}
              >
                <span className="inline-block h-3.5 w-0.5" style={{ background: "#b07880" }} />
                Maison Temps
              </span>
              <h2
                className="mt-5 font-serif tracking-[0.01em]"
                style={{ fontSize: "1.875rem", lineHeight: 1.15, color: "#2d1a20" }}
              >
                Join the<br />Maison.
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8a6070" }}>
                Create your account and explore our curated collection of the world&apos;s finest timepieces.
              </p>
            </div>

            {/* Brand illustration */}
            <div className="relative z-10 mt-auto">
              <Image
                src="/login-designs.png"
                alt="Maison Temps watch collection"
                width={700}
                height={480}
                className="w-full object-contain"
                style={{ mixBlendMode: "multiply" }}
                priority
              />
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
            {/* Tab switcher */}
            <div className="mb-6 flex border-b border-hairline">
              <Link
                href="/account/login"
                className="border-b-2 border-transparent pb-3 pr-6 text-sm font-medium text-stone transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none"
              >
                Sign In
              </Link>
              <span
                className="border-b-2 border-gold pb-3 px-6 text-sm font-semibold text-foreground"
                aria-current="page"
              >
                Create Account
              </span>
            </div>

            <div className="mb-5">
              <h1 className="font-serif text-2xl text-foreground">Create account</h1>
              <p className="mt-1 text-sm text-stone">Join Maison Temps — free, always.</p>
            </div>

            {error && (
              <div role="alert" className="mb-4 flex items-start gap-2 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Jane"
                    aria-invalid={!!errors.firstName}
                    {...register("firstName", { required: "Required" })}
                    className="w-full border border-hairline bg-transparent px-4 py-2.5 text-sm placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20"
                    style={{ borderRadius: "8px" }}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600" role="alert">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Doe"
                    aria-invalid={!!errors.lastName}
                    {...register("lastName", { required: "Required" })}
                    className="w-full border border-hairline bg-transparent px-4 py-2.5 text-sm placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20"
                    style={{ borderRadius: "8px" }}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600" role="alert">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  })}
                  className="w-full border border-hairline bg-transparent px-4 py-2.5 text-sm placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20"
                  style={{ borderRadius: "8px" }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    aria-invalid={!!errors.password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Must be at least 8 characters" },
                    })}
                    className="w-full border border-hairline bg-transparent px-4 py-2.5 pr-11 text-sm placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20"
                    style={{ borderRadius: "8px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone/50 transition-colors hover:text-stone focus-visible:text-stone focus-visible:outline-none"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600" role="alert">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-stone"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    aria-invalid={!!errors.confirmPassword}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    className="w-full border border-hairline bg-transparent px-4 py-2.5 pr-11 text-sm placeholder:text-stone/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20"
                    style={{ borderRadius: "8px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone/50 transition-colors hover:text-stone focus-visible:text-stone focus-visible:outline-none"
                  >
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600" role="alert">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
                style={{ borderRadius: "8px" }}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account…
                  </>
                ) : "Create Account"}
              </button>

              <p className="text-center text-xs text-stone/60">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="text-stone underline underline-offset-2 transition-colors hover:text-gold">
                  Terms
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-stone underline underline-offset-2 transition-colors hover:text-gold">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-hairline" />
              <span className="text-xs text-stone/60">or sign up with</span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/account" })}
              className="mt-4 flex w-full items-center justify-center gap-3 border border-hairline bg-white px-4 py-3 text-xs font-medium text-foreground transition-all hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:outline-none"
              style={{ borderRadius: "8px" }}
            >
              <GoogleLogo />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
