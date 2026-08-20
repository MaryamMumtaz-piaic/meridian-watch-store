"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "@/app/actions/register";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

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
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md border border-hairline bg-white px-8 py-10">
        <span className="eyebrow">Create Account</span>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Join the Maison</h1>
        <p className="mt-3 text-sm text-stone">
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="text-gold underline underline-offset-2 hover:text-gold-bright"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                {...register("firstName", { required: "Required" })}
                className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                {...register("lastName", { required: "Required" })}
                className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
              className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Min 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Must be at least 8 characters" },
              })}
              className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-xs text-stone/60">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gold">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gold">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
