import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-sm text-ink placeholder:text-stone-light focus:border-gold focus:outline-none focus:ring-0 transition-colors duration-300 disabled:opacity-50";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(fieldBase, "resize-none", className)} {...props} />
  );
}

export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(fieldBase, "cursor-pointer appearance-none", className)}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("eyebrow block text-stone", className)}
      {...props}
    />
  );
}

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
