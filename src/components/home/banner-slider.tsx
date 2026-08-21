"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Served in numeric order: 1 → 2 → 3 → 4 → 5
const SLIDES = [
  "/banner/1.png",
  "/banner/2.png",
  "/banner/3.png",
  "/banner/4.png",
  "/banner/5.png",
];

const DURATION = 4500;

export function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo]
  );
  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo]
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, DURATION);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="w-full border-y border-hairline bg-white py-10 lg:py-14"
      aria-label="Promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── Split layout: text left · carousel right ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">

          {/* ── LEFT: Sale editorial text ── */}
          <div className="flex flex-col justify-center lg:w-[38%]">

            {/* Limited-time badge */}
            <div className="inline-flex w-fit items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                Limited Time Offer
              </span>
            </div>

            <h2 className="mt-5 font-serif text-4xl font-extrabold leading-[1.06] tracking-tight text-foreground lg:text-5xl">
              Season Sale —{" "}
              <em className="not-italic text-gold">Up to 40% Off.</em>
            </h2>

            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-stone">
              Exceptional timepieces at extraordinary prices. Discover curated
              discounts across all four collections — for a limited time only.
            </p>

        

            {/* CTA */}
            <Link
              href="/watches"
              className="group mt-7 inline-flex w-fit items-center gap-3 bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-200 hover:bg-gold-bright hover:shadow-md"
            >
              Shop the Sale
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
            </Link>

            {/* Slide counter */}
            <p className="mt-8 font-mono text-xs text-stone/50">
              <span className="font-semibold text-gold">{String(current + 1).padStart(2, "0")}</span>
              {" / "}
              {String(SLIDES.length).padStart(2, "0")}
            </p>
          </div>

          {/* ── RIGHT: Banner carousel ── */}
          <div className="lg:w-[62%]">

            {/* Image frame — rounded corners + smooth shadow */}
            <div className="group/banner relative w-full overflow-hidden rounded-2xl bg-secondary shadow-xl" style={{ paddingBottom: "56.25%", height: 0 }}>
              {/* Slides */}
              {SLIDES.map((src, i) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    i === current
                      ? "opacity-100 scale-100"
                      : "pointer-events-none opacity-0 scale-[1.04]"
                  }`}
                  aria-hidden={i !== current}
                >
                  <Image
                    src={src}
                    alt={`Promotional banner ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Prev arrow */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous banner"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/35 group-hover/banner:opacity-100 lg:h-11 lg:w-11"
              >
                <ChevronLeft className="h-4 w-4 text-white" strokeWidth={2} />
              </button>

              {/* Next arrow */}
              <button
                type="button"
                onClick={next}
                aria-label="Next banner"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/35 group-hover/banner:opacity-100 lg:h-11 lg:w-11"
              >
                <ChevronRight className="h-4 w-4 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* Dots + progress below image */}
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to banner ${i + 1}`}
                    className={`h-[3px] cursor-pointer rounded-full transition-all duration-300 ${
                      i === current ? "w-7 bg-gold" : "w-2 bg-hairline hover:bg-gold/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
