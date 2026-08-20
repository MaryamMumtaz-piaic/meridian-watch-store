"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProfileForm = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
];

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "Jane Collector",
      email: "jane@example.com",
    },
  });

  const newPassword = watch("newPassword");

  async function onSubmit(_: ProfileForm) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <nav className="sticky top-28 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 border-l-2 py-2.5 pl-4 text-sm transition-colors hover:border-gold hover:text-foreground ${
                link.href === "/account/profile"
                  ? "border-gold text-foreground font-medium"
                  : "border-transparent text-stone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main>
        {/* Mobile nav */}
        <nav className="mb-8 flex gap-4 overflow-x-auto border-b border-hairline pb-4 lg:hidden">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 border-b-2 border-transparent pb-1 text-xs font-medium uppercase tracking-[0.12em] text-stone hover:border-gold hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="eyebrow">My Account</span>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-xl space-y-8">
          {/* Personal info */}
          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Personal Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  {...register("email")}
                  className="mt-2 w-full cursor-not-allowed border border-hairline bg-muted/30 px-4 py-3 text-sm text-stone focus:outline-none"
                />
                <p className="mt-1 text-xs text-stone/60">
                  Contact support to change your email address.
                </p>
              </div>
            </div>
          </div>

          {/* Change password */}
          <div className="border-t border-hairline pt-8">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-stone">
              Change Password
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("currentPassword")}
                  className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Min 8 characters"
                  {...register("newPassword", {
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                  })}
                  className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-stone" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat new password"
                  {...register("confirmPassword", {
                    validate: (val) =>
                      !newPassword || val === newPassword || "Passwords do not match",
                  })}
                  className="mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-sm placeholder:text-stone/50 focus:border-gold focus:outline-none"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-hairline pt-6">
            <button
              type="submit"
              disabled={loading}
              className="border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold hover:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>
            {saved && (
              <span className="text-xs font-medium text-green-600">
                ✓ Changes saved
              </span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
