import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-[0.18em] text-[0.6875rem] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream cursor-pointer",
  {
    variants: {
      variant: {
        solid: "bg-ink text-cream hover:bg-gold hover:text-ink",
        outline:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
        light:
          "border border-cream/35 text-cream hover:bg-cream hover:text-ink hover:border-cream",
        gold: "bg-gold text-ink hover:bg-gold-dark hover:text-cream",
        ghost: "text-ink hover:text-gold",
        link: "text-ink underline underline-offset-4 hover:text-gold decoration-ink/30",
      },
      size: {
        sm: "h-9 px-5",
        md: "h-12 px-8",
        lg: "h-14 px-12",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
