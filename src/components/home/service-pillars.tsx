import { ShieldCheck, PenLine, Truck, BadgeCheck } from "lucide-react";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    body: "Every movement is covered, transferable to whoever wears it next.",
  },
  {
    icon: PenLine,
    title: "Complimentary Engraving",
    body: "A caseback inscription, included on every order at no extra cost.",
  },
  {
    icon: Truck,
    title: "Insured Shipping",
    body: "Fully insured delivery, with free returns within 30 days.",
  },
  {
    icon: BadgeCheck,
    title: "Lifetime Authentication",
    body: "A registered certificate of authenticity for every reference sold.",
  },
];

export function ServicePillars() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
      <div className="grid gap-10 border-t border-hairline pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <div key={service.title}>
            <service.icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
            <h3 className="mt-4 font-serif text-lg text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{service.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
