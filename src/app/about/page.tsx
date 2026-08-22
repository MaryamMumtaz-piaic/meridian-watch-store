import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crosshair, BookOpen, Zap, Clock, Package, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Maison Temps was founded on a singular conviction: that a watch is not a product — it is a promise, made in metal and movement, to endure.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="bg-ink py-28 lg:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">Our Story</span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight tracking-tight text-parchment sm:text-6xl lg:text-7xl">
            Born from a Passion<br />
            <em className="not-italic text-gold-bright">for Time</em>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-parchment/65">
            Since our founding, Maison Temps has stood apart — not through volume, but through
            conviction. We build watches that earn their place on the wrist across generations.
          </p>
        </div>
      </section>

      {/* ── Founding Story ── */}
      <section className="py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Text */}
            <div>
              <span className="eyebrow">The Maison</span>
              <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                A Dedication to Horological Excellence
              </h2>
              <div className="mt-7 space-y-5 text-sm leading-relaxed text-stone">
                <p>
                  Maison Temps was founded in the valleys of the Jura arc — the same limestone
                  corridor that gave the world its finest movement makers. From the beginning, our
                  ateliers were built around a single discipline: the pursuit of accuracy without
                  compromise. Every calibre that leaves our workshops has been regulated to within
                  three seconds per day.
                </p>
                <p>
                  Where other houses chased complication counts, we chased finishing. Our movements
                  feature hand-bevelled bridges, Côtes de Genève striping, and heat-blued screws —
                  details invisible beneath the dial, placed there for the watchmaker who will open
                  this case in fifty years and know immediately that it was made with care.
                </p>
                <p>
                  Our four collections — Aero, Pulse, Studio, and Summit — were not designed in a
                  boardroom. They emerged from the disciplines of people who actually needed a watch.
                </p>
              </div>
            </div>

            {/* Quote + stats */}
            <div className="flex flex-col gap-8">
              <blockquote className="border-l-4 border-gold pl-7 py-4">
                <p className="font-serif text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  &ldquo;A watch that tells you the time is a commodity. A watch that holds the time — that is something else entirely.&rdquo;
                </p>
                <footer className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-stone">
                  — Founder, Maison Temps
                </footer>
              </blockquote>

              <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline">
                {[
                  { icon: Crosshair, label: "Case tolerances", value: "±0.01 mm" },
                  { icon: Clock, label: "Regulation target", value: "±3 sec/day" },
                  { icon: Package, label: "Movement components", value: "200+" },
                  { icon: Timer, label: "Hours of testing", value: "72 hrs" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background p-5">
                    <stat.icon className="mb-2 h-4 w-4 text-gold/60" strokeWidth={1.5} />
                    <p className="font-mono text-xl font-semibold text-gold">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-stone">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-t border-hairline bg-[#f5f1ea] py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <span className="eyebrow">Our Principles</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Three pillars. One standard.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Crosshair,
                title: "Precision",
                body: "Every component in a Maison Temps movement is machined to tolerances that defy the human eye. We hold ourselves to ±0.01 millimetre across 200 individual parts — because a watch that loses ten seconds a day is, in our view, not yet finished.",
              },
              {
                icon: BookOpen,
                title: "Heritage",
                body: "We build upon five decades of horological tradition, preserving hand-finishing techniques that modern production has largely abandoned. Our master watchmakers spend years in apprenticeship before touching a movement destined for a client's wrist.",
              },
              {
                icon: Zap,
                title: "Innovation",
                body: "Tradition without progress is nostalgia. We invest in new case materials — Grade-5 titanium, anti-magnetic silicon escapements — while preserving the craft beneath them. The result is a watch prepared for the next century.",
              },
            ].map((v) => (
              <div key={v.title} className="group">
                <div className="flex h-10 w-10 items-center justify-center border border-hairline">
                  <v.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{v.title}</h3>
                <div className="mt-2 h-px w-8 bg-gold transition-all duration-300 group-hover:w-16" />
                <p className="mt-4 text-sm leading-relaxed text-stone">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-ink py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <span className="eyebrow text-gold-bright">The Maison in Numbers</span>
          </div>
          <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              { number: "50+", label: "Years of Expertise" },
              { number: "10,000+", label: "Timepieces Delivered" },
              { number: "4", label: "Iconic Collections" },
              { number: "5-Year", label: "Transferable Warranty" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-ink px-6 py-10 text-center"
              >
                <p className="font-serif text-4xl font-bold text-gold-bright sm:text-5xl">
                  {stat.number}
                </p>
                <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-parchment/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craftsmanship CTA ── */}
      <section className="py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="eyebrow">The Atelier</span>
            <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              See how each timepiece is brought to life — one component at a time.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-stone">
              From raw brass dial blanks to hand-bevelled bridges, the craftsmanship behind every
              Maison Temps watch is a story of patience, precision, and pride.
            </p>
            <Link
              href="/craftsmanship"
              className="group mt-2 inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-gold hover:bg-gold"
            >
              Explore Craftsmanship
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
