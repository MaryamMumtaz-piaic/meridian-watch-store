import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description:
    "Inside the Maison Temps atelier — the techniques, materials, and standards that define every timepiece we create.",
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Movement Assembly",
    body: "Each calibre begins as 200+ individual components, machined to tolerances measured in hundredths of a millimetre. Our master watchmakers assemble every movement by hand — bridge by bridge, jewel by jewel — under 10× magnification. The process takes up to eighteen hours per movement before a single second is counted.",
  },
  {
    number: "02",
    title: "Case Finishing",
    body: "The case undergoes seven distinct finishing stages: rough machining, precision milling, surface grinding, anglage, brushing, polishing, and final inspection. Anglage — the hand-bevelling of every lug edge and case flank — is the mark of a house that considers the view from every angle. It cannot be automated.",
  },
  {
    number: "03",
    title: "Dial Making",
    body: "A dial starts as a raw brass blank — flat, unassuming, and deliberately blank. From there: lacquering, texturing, galvanic treatment, applied index fitting, and printing. A sunray finish requires eleven passes under rotating brushes at controlled pressure. The dial you see represents nearly a full day of process before it enters the movement.",
  },
  {
    number: "04",
    title: "Quality Control",
    body: "Every watch passes a 72-hour timing test in six positions, mirroring the orientations of a wrist in motion. Water resistance is verified to rated depth in a pressure chamber. Each crystal is inspected for optical distortion under polarised light. Only when every criterion is met does a watch receive its serial number.",
  },
];

const MATERIALS = [
  {
    symbol: "Ti",
    title: "Grade-5 Titanium",
    body: "40% lighter than steel, with a strength-to-weight ratio that outperforms most alloys. We use aerospace-grade Grade-5 titanium for cases that endure without burdening the wrist.",
  },
  {
    symbol: "S",
    title: "Sapphire Crystal",
    body: "Grown as a single crystal of aluminium oxide, hardness-rated at 9 on the Mohs scale. Our crystals are double-domed and AR-coated on both surfaces to eliminate glare at any angle.",
  },
  {
    symbol: "CH",
    title: "Swiss Movements",
    body: "Every calibre is assembled and regulated in Switzerland. We source ebauches from established Swiss manufacturers and finish, decorate, and regulate them to our own standards in our workshops.",
  },
  {
    symbol: "L",
    title: "Vegetable-Tanned Leather",
    body: "Our straps are sourced from tanneries in the Tuscany and the Jura. Vegetable tanning produces leather that develops a patina unique to the wearer — a strap that belongs, over time, to nobody else.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="bg-ink py-32 lg:py-44">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">The Atelier</span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight tracking-tight text-parchment sm:text-6xl lg:text-7xl">
            Every Detail,{" "}
            <em className="not-italic text-gold-bright">Deliberate</em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-parchment/70">
            A Maison Temps watch takes between three and six months to complete. Here is what
            happens during those months — and why every hour of it matters.
          </p>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-24 lg:space-y-32">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Text */}
                <div>
                  <p className="font-serif text-8xl font-bold leading-none text-gold/15 select-none">
                    {step.number}
                  </p>
                  <h2 className="-mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    {step.title}
                  </h2>
                  <div className="mt-4 h-px w-12 bg-gold" />
                  <p className="mt-6 text-sm leading-relaxed text-stone">{step.body}</p>
                </div>

                {/* Image placeholder */}
                <div className="aspect-video w-full bg-secondary border border-hairline" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials ── */}
      <section className="border-t border-hairline bg-[#f5f1ea] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14">
            <span className="eyebrow">Materials</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Selected for a reason.{" "}
              <em className="not-italic text-gold">Every one.</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map((m) => (
              <div
                key={m.title}
                className="group border border-hairline bg-background p-8 transition-colors hover:border-gold"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-gold/40 font-mono text-sm font-bold text-gold">
                  {m.symbol}
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-foreground">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">The Collections</span>
          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl font-bold text-parchment sm:text-4xl">
            Now that you know how they&rsquo;re made — find the one built for you.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-gold-bright hover:border-gold-bright"
            >
              Discover Collections
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-parchment/80 transition-all duration-300 hover:border-white/50 hover:text-parchment"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
