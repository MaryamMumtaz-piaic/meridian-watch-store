import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Boutiques",
  description:
    "Visit Maison Temps in person — our boutiques are in New York, London, Paris, Dubai, Tokyo, and Singapore.",
};

type BoutiqueData = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  country?: string;
  hours?: string;
};

const STATIC_BOUTIQUES: BoutiqueData[] = [
  {
    id: "ny",
    name: "Maison Temps New York",
    city: "New York",
    address: "745 Fifth Avenue, New York, NY 10022",
    phone: "+1 (212) 555-0180",
    country: "United States",
    hours: "Mon–Sat 10:00–19:00, Sun 11:00–17:00",
  },
  {
    id: "ldn",
    name: "Maison Temps London",
    city: "London",
    address: "12 New Bond Street, London W1S 2RB",
    phone: "+44 20 7895 0120",
    country: "United Kingdom",
    hours: "Mon–Sat 10:00–19:00, Sun 11:00–17:00",
  },
  {
    id: "par",
    name: "Maison Temps Paris",
    city: "Paris",
    address: "8 Place Vendôme, 75001 Paris",
    phone: "+33 1 55 35 0180",
    country: "France",
    hours: "Mon–Sat 10:00–19:00, Dim 11:00–17:00",
  },
  {
    id: "dxb",
    name: "Maison Temps Dubai",
    city: "Dubai",
    address: "The Dubai Mall, Fashion Avenue, Level 2",
    phone: "+971 4 339 0560",
    country: "United Arab Emirates",
    hours: "Sun–Thu 10:00–22:00, Fri–Sat 10:00–24:00",
  },
  {
    id: "tyo",
    name: "Maison Temps Tokyo",
    city: "Tokyo",
    address: "6-10-1 Ginza, Chūō-ku, Tokyo 104-0061",
    phone: "+81 3 3569 0180",
    country: "Japan",
    hours: "Daily 11:00–20:00",
  },
  {
    id: "sin",
    name: "Maison Temps Singapore",
    city: "Singapore",
    address: "Marina Bay Sands, B1-01, 10 Bayfront Avenue",
    phone: "+65 6688 0180",
    country: "Singapore",
    hours: "Daily 10:30–22:00",
  },
];

export default async function BoutiquesPage() {
  const dbBoutiques = await prisma.boutique.findMany();

  const boutiques: BoutiqueData[] =
    dbBoutiques.length > 0
      ? dbBoutiques.map((b) => ({
          id: b.id,
          name: b.name,
          city: b.city,
          address: b.address,
          phone: b.phone,
        }))
      : STATIC_BOUTIQUES;

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="bg-ink py-32 lg:py-44">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">Our Boutiques</span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight text-parchment sm:text-6xl lg:text-7xl">
            Visit{" "}
            <em className="not-italic text-gold-bright">the Maison</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-parchment/70">
            Six boutiques, six cities, one standard of hospitality. Each location carries the
            full collection and offers private consultations by appointment.
          </p>

          {/* City names strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {STATIC_BOUTIQUES.map((b, i) => (
              <span key={b.id} className="flex items-center gap-6">
                <span className="text-sm font-medium tracking-wide text-parchment/60">
                  {b.city}
                </span>
                {i < STATIC_BOUTIQUES.length - 1 && (
                  <span className="text-parchment/20">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── World presence bar ── */}
      <div className="bg-[#f5f1ea] border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-hairline" />
            <p className="shrink-0 text-center text-xs font-medium uppercase tracking-[0.2em] text-stone">
              Maison Temps — Present in 6 cities worldwide
            </p>
            <div className="h-px flex-1 bg-hairline" />
          </div>
        </div>
      </div>

      {/* ── Boutique Cards ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boutiques.map((boutique) => (
              <div
                key={boutique.id}
                className="group flex flex-col border border-hairline bg-background p-8 transition-colors hover:border-gold"
              >
                {/* City */}
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                    {boutique.country ?? "Maison Temps"}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
                    {boutique.city}
                  </h2>
                </div>

                {/* Details */}
                <div className="mt-6 flex flex-col gap-4 text-sm text-stone">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                    <span className="leading-snug">{boutique.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-gold/60" />
                    <a
                      href={`tel:${boutique.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-gold"
                    >
                      {boutique.phone}
                    </a>
                  </div>
                  {boutique.hours && (
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                      <span className="leading-snug">{boutique.hours}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-hairline" />

                {/* Actions */}
                <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="flex-1 border border-foreground bg-foreground px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold"
                  >
                    Get Directions
                  </a>
                  <button
                    type="button"
                    className="flex-1 border border-hairline px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:border-gold hover:text-gold"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Private Consultation CTA ── */}
      <section className="border-t border-hairline bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <span className="eyebrow text-gold-bright">Private Consultations</span>
          <h2 className="mt-6 font-serif text-3xl font-bold text-parchment sm:text-4xl">
            Every visit is a private experience.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-parchment/70">
            Our specialists will guide you through the full collection — movement by movement,
            finishing detail by detail — with no pressure and as much time as you need.
            Private appointments are available at all six locations.
          </p>
          <div className="mt-10">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-gold-bright hover:border-gold-bright"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
