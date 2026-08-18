import Link from "next/link";
import { WatchMark } from "@/components/home/watch-mark";

export function CraftsmanshipTeaser() {
  return (
    <section className="border-t border-hairline bg-ink text-parchment">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
        <div className="flex aspect-[4/3] items-center justify-center border border-white/10 bg-white/[0.03] text-gold-bright/70 lg:order-2">
          <WatchMark className="h-32 w-32" />
        </div>
        <div className="lg:order-1">
          <span className="eyebrow text-gold-bright">Savoir-Faire</span>
          <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight sm:text-4xl">
            Every movement, hand-finished.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/70">
            Each caliber passes through the same bench for three days —
            beveled by hand, regulated in five positions, and tested for two
            weeks before it earns the Maison Temps mark on its bridge.
          </p>
          <Link
            href="/craftsmanship"
            className="mt-7 inline-block cursor-pointer border-b border-gold-bright pb-1 text-xs font-medium uppercase tracking-[0.14em] text-gold-bright transition-opacity hover:opacity-80"
          >
            Discover the Atelier
          </Link>
        </div>
      </div>
    </section>
  );
}
