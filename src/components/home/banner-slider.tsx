"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className="w-full bg-white pb-5 pt-0"
      aria-label="Promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Banner frame: small side margins like the reference ── */}
      <div className="mx-5 sm:mx-7 lg:mx-9">

        {/* Image container — explicit responsive height so Next.js fill works */}
        <div className="group/banner relative h-[200px] w-full overflow-hidden bg-secondary sm:h-[290px] lg:h-[400px] xl:h-[460px]">

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
                sizes="(min-width: 1280px) calc(100vw - 72px), (min-width: 640px) calc(100vw - 56px), calc(100vw - 40px)"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}

          {/* ── Left arrow — dark square, sits at edge of banner ── */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 cursor-pointer items-center justify-center bg-ink/70 opacity-0 transition-all duration-200 hover:bg-ink/90 group-hover/banner:opacity-100 lg:h-13 lg:w-13"
          >
            <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>

          {/* ── Right arrow ── */}
          <button
            type="button"
            onClick={next}
            aria-label="Next banner"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 cursor-pointer items-center justify-center bg-ink/70 opacity-0 transition-all duration-200 hover:bg-ink/90 group-hover/banner:opacity-100 lg:h-13 lg:w-13"
          >
            <ChevronRight className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Dots + progress — below the banner, on white ── */}
        <div className="mt-3 flex flex-col items-center gap-2.5">

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-[3px] cursor-pointer rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-gold"
                    : "w-2 bg-hairline hover:bg-gold/40"
                }`}
              />
            ))}
          </div>

          {/* Thin gold progress line */}
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
    </section>
  );
}
