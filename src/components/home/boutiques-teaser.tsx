import Link from "next/link";

const BOUTIQUES = [
  { city: "New York", address: "5th Avenue, Manhattan" },
  { city: "London", address: "Regent Street, Mayfair" },
  { city: "Tokyo", address: "Shibuya, Tokyo" },
  { city: "Dubai", address: "The Dubai Mall" },
];

export function BoutiquesTeaser() {
  return (
    <section className="border-t border-hairline bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div>
          <span className="eyebrow">Boutiques</span>
          <h2 className="mt-4 max-w-md font-serif font-semibold text-3xl text-foreground sm:text-4xl">
            See it, try it, on your wrist.
          </h2>
          <p className="mt-5 max-w-sm border-l border-gold/40 pl-4 text-sm leading-[1.85] text-stone">
            Book a private appointment at one of our boutiques for a fitting,
            an engraving consultation, or simply to see the finishing in
            person.
          </p>
          <Link
            href="/boutiques"
            className="mt-7 inline-block cursor-pointer border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Find a Boutique
          </Link>
        </div>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {BOUTIQUES.map((boutique) => (
            <li key={boutique.city} className="flex items-baseline justify-between gap-6 py-5">
              <span className="font-serif text-lg text-foreground">{boutique.city}</span>
              <span className="text-sm text-stone">{boutique.address}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
