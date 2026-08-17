import Link from "next/link";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "shipping", label: "Shipping", href: "/checkout/shipping" },
  { id: "payment", label: "Payment", href: "/checkout/payment" },
  { id: "review", label: "Review", href: "/checkout/review" },
] as const;

export function CheckoutSteps({
  current,
}: {
  current: (typeof STEPS)[number]["id"];
}) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <nav className="flex items-center justify-center gap-3 sm:gap-5">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const reachable = i <= currentIndex;

        const content = (
          <span
            className={cn(
              "eyebrow flex items-center gap-2.5",
              active ? "text-ink" : done ? "text-stone" : "text-stone-light",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[0.625rem]",
                active
                  ? "border-ink bg-ink text-cream"
                  : done
                    ? "border-ink/40 text-ink"
                    : "border-ink/15",
              )}
            >
              {i + 1}
            </span>
            {step.label}
          </span>
        );

        return (
          <div key={step.id} className="flex items-center gap-3 sm:gap-5">
            {i > 0 ? <span className="h-px w-6 bg-ink/15 sm:w-10" /> : null}
            {reachable && !active ? (
              <Link href={step.href}>{content}</Link>
            ) : (
              content
            )}
          </div>
        );
      })}
    </nav>
  );
}
