import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Repair",
  description: "Maison Temps offers a 5-year warranty, watch authentication, bespoke engraving, and expert service & repair.",
};

export default function ServicesPage() {
  return (
    <div>

      {/* ═══════════════════════════
          HERO
      ═══════════════════════════ */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">Maison Services</span>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Care{" "}
            <em className="not-italic text-gold">Beyond the Sale</em>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-stone">
            A Maison Temps watch is built to last a lifetime. Our services team
            ensures it does — with industry-leading warranty coverage, independent
            authentication, and in-house craftsmanship for every request.
          </p>

          {/* Anchor navigation */}
          <nav className="mt-10 flex flex-wrap gap-3" aria-label="Services">
            {[
              { href: "#warranty", label: "Warranty" },
              { href: "#authentication", label: "Authentication" },
              { href: "#engraving", label: "Engraving" },
              { href: "#repair", label: "Service & Repair" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="border border-hairline px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-all hover:border-gold hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ═══════════════════════════
          WARRANTY
      ═══════════════════════════ */}
      <section id="warranty" className="bg-[#f5f1ea] py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div>
              <span className="mb-4 block text-4xl text-gold/60">◈</span>
              <span className="eyebrow">Warranty</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                The 5-Year Warranty
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-stone">
                Every watch we sell comes with a comprehensive 5-year transferable warranty —
                one of the longest in the industry. Your timepiece is protected from day one.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Manufacturing defects in case, crown, and case back",
                  "Movement malfunctions (automatic, quartz, and complications)",
                  "Water resistance failure under normal conditions",
                  "Crystal delamination or factory-bonding failures",
                  "Bracelet and clasp manufacturing defects",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-stone">
                The warranty is fully transferable — if you sell the watch, the coverage transfers
                with it. A physical certificate with a unique serial number is included with every order.
              </p>
            </div>
            <div className="border border-hairline bg-white p-10">
              <div className="space-y-6">
                {[
                  { label: "Coverage Period", value: "5 Years" },
                  { label: "Transferable", value: "Yes — unlimited transfers" },
                  { label: "Certificate", value: "Included with every order" },
                  { label: "Service During Warranty", value: "Free, at our atelier" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-hairline pb-6 last:border-0 last:pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">{label}</p>
                    <p className="text-sm font-medium text-foreground text-right">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          AUTHENTICATION
      ═══════════════════════════ */}
      <section id="authentication" className="bg-white py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div className="order-2 lg:order-1 border border-hairline bg-[#f5f1ea] p-10">
              <h3 className="mb-6 font-serif text-lg text-foreground">What We Authenticate</h3>
              <ul className="space-y-4">
                {[
                  "Movement calibre and serial number verification",
                  "Case and bracelet material authenticity",
                  "Dial and hands originality",
                  "Factory specifications and finishing standards",
                  "Box and papers cross-referencing",
                  "Water-resistance pressure testing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-stone">
                    <span className="mt-1 text-gold">◇</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-hairline pt-5 text-xs text-stone/70">
                Each authenticated watch receives a signed Maison Temps Certificate of Authenticity
                with a unique serial number, inspection date, and inspector signature.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <span className="mb-4 block text-4xl text-gold/60">◇</span>
              <span className="eyebrow">Authentication</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Watch Authentication
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-stone">
                Every timepiece sold through Maison Temps undergoes a rigorous multi-point
                authentication by our in-house horologists — before it ever reaches your wrist.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                We also authenticate watches purchased elsewhere. Our independent service gives
                collectors peace of mind and increases resale value. Authentication typically takes
                3–5 business days.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
              >
                Request Authentication
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          ENGRAVING
      ═══════════════════════════ */}
      <section id="engraving" className="bg-[#f5f1ea] py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div>
              <span className="mb-4 block text-4xl text-gold/60">◉</span>
              <span className="eyebrow">Bespoke</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Engraving
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-stone">
                Turn a timepiece into a legacy. Our atelier offers bespoke case-back engraving
                — initials, dates, coordinates, or a short dedication — executed by hand using
                traditional diamond-tipped tools.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                Engraving is available on most case-back surfaces. We can accommodate Latin script,
                Arabic numerals, and coordinates. Custom motifs are available upon request and
                are priced individually.
              </p>
              <div className="mt-6 flex items-center gap-2 border-l-2 border-gold pl-4">
                <p className="text-sm text-foreground">
                  Engraving from <strong className="text-gold">$150</strong> — turnaround 5–7 business days.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
              >
                Request Engraving
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { type: "Case-Back Text", desc: "Up to 40 characters, any message", price: "From $150" },
                { type: "Initials", desc: "Monogram engraving, 1–3 letters", price: "From $120" },
                { type: "Coordinates", desc: "GPS coordinates to six decimal places", price: "From $160" },
                { type: "Custom Motif", desc: "Decorative artwork by request", price: "POA" },
              ].map(({ type, desc, price }) => (
                <div key={type} className="flex items-center justify-between gap-4 border border-hairline bg-white p-5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{type}</p>
                    <p className="mt-0.5 text-xs text-stone">{desc}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm text-gold">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          REPAIR
      ═══════════════════════════ */}
      <section id="repair" className="bg-white py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14">
            <span className="eyebrow">Atelier</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Service & Repair
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone">
              Our in-house horologists service any luxury mechanical watch — not just watches
              purchased from Maison Temps. Every service includes a full movement inspection
              and a 12-month post-service warranty.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Full Movement Overhaul", desc: "Complete disassembly, cleaning, lubrication, and reassembly of the movement." },
              { title: "Case & Bracelet Refinishing", desc: "Polishing and brushing to restore original factory finishing standards." },
              { title: "Crystal Replacement", desc: "Sapphire and mineral crystal replacement using factory-matched parts." },
              { title: "Pressure & Water-Resistance Testing", desc: "ISO-certified testing up to the watch's rated depth specification." },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-hairline bg-[#f5f1ea] p-6">
                <div className="mb-3 h-1 w-6 bg-gold" />
                <h3 className="font-serif text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-lg">
            <div className="border border-hairline p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Standard Service</p>
              <p className="mt-2 font-serif text-2xl text-foreground">3–4 Weeks</p>
              <p className="mt-1 text-xs text-stone">Full movement overhaul + inspection</p>
            </div>
            <div className="border border-hairline bg-ink p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-bright">Express Service</p>
              <p className="mt-2 font-serif text-2xl text-parchment">7–10 Days</p>
              <p className="mt-1 text-xs text-parchment/60">Priority queue + dedicated technician</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
          >
            Book a Service
          </Link>
        </div>
      </section>

    </div>
  );
}
