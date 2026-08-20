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
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
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

          {/* ── LEFT: Editorial text ── */}
          <div className="flex flex-col justify-center lg:w-[38%]">

            <span className="eyebrow">Exclusive Collection</span>

            <h2 className="mt-4 font-serif text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground lg:text-5xl">
              Crafted for the{" "}
              <em className="not-italic text-gold">Extraordinary.</em>
            </h2>

            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-stone">
              Each Maison Temps timepiece is a statement of precision —
              built for those who demand perfection in every detail.
            </p>

            {/* Gold rule */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-gold" />
              <div className="h-[2px] w-3 bg-gold/30" />
            </div>

            {/* CTA */}
            <Link
              href="/collections"
              className="group mt-8 inline-flex w-fit items-center gap-3 border border-ink bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:border-gold hover:bg-gold"
            >
              Explore Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>

            {/* Slide counter */}
            <p className="mt-8 font-mono text-xs text-stone/50">
              <span className="text-gold font-semibold">{String(current + 1).padStart(2, "0")}</span>
              {" / "}
              {String(SLIDES.length).padStart(2, "0")}
            </p>
          </div>

          {/* ── RIGHT: Banner carousel ── */}
          <div className="lg:w-[62%]">

            {/* Image frame — padding-bottom 56.25% = reliable 16:9 in any flex context */}
            <div className="group/banner relative w-full overflow-hidden bg-secondary shadow-md" style={{ paddingBottom: "56.25%", height: 0 }}>
              {/* Slides */}
              {SLIDES.map((src, i) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    i === current ? "opacity-100" : "pointer-events-none opacity-0"
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
              <div className="h-px w-full bg-hairline">
                {!paused && (
                  <div
                    key={`progress-${progressKey}`}
                    className="h-full origin-left bg-gold"
                    style={{ animation: `banner-progress ${DURATION}ms linear forwards` }}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
