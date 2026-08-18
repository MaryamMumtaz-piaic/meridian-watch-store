"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { formatPriceCents } from "@/lib/format";

export type HeroSlide = {
  id: string;
  slug: string;
  name: string;
  collectionName: string;
  caseSize: string;
  priceCents: number;
  image: string;
};

const FALLBACK_SLIDE: HeroSlide = {
  id: "fallback",
  slug: "",
  name: "Time, made to be kept.",
  collectionName: "Maison Temps",
  caseSize: "",
  priceCents: 0,
  image: "/hero/1.jpeg",
};

/** Editorial copy for each rotating hero design — cycles by slide index, independent of how many featured products exist. */
const SLIDE_COPY = [
  {
    eyebrow: "Reference No. 001 — Since 2026",
    headlineLead: "Time, made to be",
    headlineAccent: "kept.",
    subcopy:
      "Maison Temps crafts fine mechanical watches for people who measure things in decades, not seasons.",
    badge: "Sale",
  },
  {
    eyebrow: "New Arrival",
    headlineLead: "Engineered for the wrist",
    headlineAccent: "you actually wear.",
    subcopy:
      "Titanium cases, sapphire crystals, and movements built to run quietly for a lifetime.",
    badge: null,
  },
  {
    eyebrow: "The Atelier Standard",
    headlineLead: "Precision that outlives",
    headlineAccent: "trend cycles.",
    subcopy:
      "Every case is finished by hand and regulated to chronometer tolerances before it leaves the atelier.",
    badge: null,
  },
  {
    eyebrow: "Swiss Movement, Reimagined",
    headlineLead: "Every second,",
    headlineAccent: "considered.",
    subcopy: "From the escapement to the clasp, nothing on a Maison Temps watch is left to chance.",
    badge: null,
  },
  {
    eyebrow: "Heirloom in the Making",
    headlineLead: "A watch you hand down,",
    headlineAccent: "not down-grade.",
    subcopy: "Built to be serviced, not replaced — a companion piece for the next fifty years.",
    badge: null,
  },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: "5-Year Warranty" },
  { icon: Truck, label: "Insured Shipping" },
  { icon: BadgeCheck, label: "Lifetime Authentication" },
];

const AUTOPLAY_MS = 3000;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const items = slides.length > 0 ? slides : [FALLBACK_SLIDE];
  const [active, setActive] = useState(0);
  const reducedMotion = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused || reducedMotion.current) return;
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, paused, active]);

  const current = items[active];
  const hasProduct = current.slug !== "";
  const copy = SLIDE_COPY[active % SLIDE_COPY.length];

  return (
    <section
      className="relative flex h-[calc(100dvh-5rem)] min-h-[560px] items-center overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Featured watches"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="sr-only" aria-live="polite">
        {hasProduct
          ? `Now showing ${current.name}, ${current.collectionName}, ${formatPriceCents(current.priceCents)}`
          : `${copy.headlineLead} ${copy.headlineAccent}`}
      </p>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:py-0">
        {/* Text */}
        <div key={`copy-${active}`} className="animate-hero-fade flex flex-col lg:col-span-5">
          <span className="eyebrow text-[10px] sm:text-xs">{copy.eyebrow}</span>
          <h1 className="mt-4 max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            {copy.headlineLead}{" "}
            <em className="font-serif italic text-gold-bright">{copy.headlineAccent}</em>
          </h1>
          <p className="mt-5 max-w-md border-l-2 border-gold/40 py-0.5 pl-4 text-sm leading-relaxed text-stone sm:text-base">
            {copy.subcopy}
          </p>

          <div className="mt-6 flex flex-nowrap items-center gap-2 sm:gap-4">
            <Link
              href="/watches"
              className="group inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-3 text-[10px] font-medium uppercase tracking-normal text-parchment shadow-[0_8px_20px_-8px_rgba(28,25,23,0.5)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_14px_28px_-10px_rgba(28,25,23,0.55)] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:flex-initial sm:gap-2 sm:px-8 sm:py-3.5 sm:text-xs sm:tracking-[0.14em]"
            >
              <span className="truncate">Shop the Collection</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/craftsmanship"
              className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-foreground/20 px-3 py-3 text-[10px] font-medium uppercase tracking-normal text-foreground outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/[0.06] hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:flex-initial sm:px-8 sm:py-3.5 sm:text-xs sm:tracking-[0.14em]"
            >
              <span className="truncate">Discover the Atelier</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-5 sm:mt-10">
            {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-stone">
                <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="group lg:col-span-7">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/20 via-gold-bright/10 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-80 sm:-inset-10"
            />
            <div className="relative h-[30vh] w-full overflow-hidden rounded-[28px] bg-secondary shadow-[0_0_0_1px_rgba(201,162,39,0.16),0_32px_70px_-28px_rgba(28,25,23,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(201,162,39,0.3),0_40px_80px_-24px_rgba(28,25,23,0.4)] sm:h-[40vh] sm:rounded-[36px] lg:h-[60vh]">
              {items.map((slide, index) => (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={hasProduct ? slide.name : "A Maison Temps watch"}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={`object-cover transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    index === active ? "scale-100" : "scale-[1.12]"
                  }`}
                  style={{ opacity: index === active ? 1 : 0 }}
                />
              ))}

              {copy.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-gold-bright px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink shadow-[0_4px_16px_rgba(0,0,0,0.18)] sm:left-6 sm:top-6">
                  {copy.badge}
                </span>
              )}

              {/* Floating product card */}
              <div
                key={current.id}
                className="animate-hero-fade absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-2xl bg-background/95 px-4 py-3 shadow-[0_12px_32px_-8px_rgba(28,25,23,0.28)] backdrop-blur transition-transform duration-500 group-hover:-translate-y-1 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[80%] sm:rounded-[24px] sm:px-5 sm:py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-stone sm:text-[11px]">
                    {current.collectionName}
                    {current.caseSize ? ` · ${current.caseSize}` : ""}
                  </p>
                  {hasProduct ? (
                    <Link
                      href={`/watches/${current.slug}`}
                      className="cursor-pointer truncate rounded-sm font-serif text-base text-foreground outline-none transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:text-xl"
                    >
                      {current.name}
                    </Link>
                  ) : (
                    <p className="truncate font-serif text-base text-foreground sm:text-xl">{current.name}</p>
                  )}
                </div>
                {hasProduct && (
                  <p className="shrink-0 font-mono text-sm text-foreground">
                    {formatPriceCents(current.priceCents)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
