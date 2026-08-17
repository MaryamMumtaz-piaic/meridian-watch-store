"use client";

import * as React from "react";
import Image from "next/image";

const SIDE_STRIPS = 28;
const FACE_SIZE = 340; // px, diameter of the puck face at rest (desktop)
const THICKNESS = 46; // px, apparent case depth
const RADIUS = FACE_SIZE / 2;
const STRIP_WIDTH = round(2 * RADIUS * Math.sin(Math.PI / SIDE_STRIPS)) + 1;

// Summit Titanium's case tones — the hero puck is that specific watch, so its
// metal gradient is reproduced directly rather than threaded through props.
const METAL = "#c9c8c4";
const METAL_DARK = "#8b8a86";

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function useScrollRotation(trackRef: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reduced) return;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = trackRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const next = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        setProgress(round(next));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, trackRef]);

  return { progress, reduced };
}

const strips = Array.from({ length: SIDE_STRIPS }, (_, i) => {
  const angle = round((i * 360) / SIDE_STRIPS);
  const shade = round(0.4 + 0.6 * (0.5 + 0.5 * Math.cos((angle * Math.PI) / 180)));
  return { angle, shade };
});

export function HeroWatch3D({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const { progress, reduced } = useScrollRotation(trackRef);

  const angle = round(reduced ? -28 : progress * 460);
  const textOpacity = round(reduced ? 1 : Math.max(0, 1 - progress / 0.3));
  const textShift = round(reduced ? 0 : progress * -40);
  const puckScale = round(
    reduced ? 1 : 0.82 + (Math.min(progress, 0.4) / 0.4) * 0.18,
  );

  return (
    <section
      ref={trackRef}
      className="relative bg-cream"
      style={{ height: reduced ? "100svh" : "280vh" }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Ambient backdrop — plain CSS so the fill Image constraint below
            never applies to a sticky ancestor. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 62% 48%, color-mix(in srgb, var(--color-gold) 14%, transparent), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <div
            className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 pt-[var(--header-height)] text-center"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textShift}px)`,
            }}
          >
            <p className="eyebrow text-gold">{eyebrow}</p>
            <h1 className="mt-6 max-w-2xl font-display text-[2.5rem] leading-[1.05] font-bold text-ink sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </div>

          {/* The puck */}
          <div
            className="relative mt-10"
            style={{
              width: FACE_SIZE,
              height: FACE_SIZE,
              perspective: "1800px",
              transform: `scale(${puckScale})`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${angle}deg) rotateX(6deg)`,
              }}
            >
              {/* front face */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  transform: `translateZ(${THICKNESS / 2}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/hero/watch-face.svg"
                  alt="Meridian Summit Titanium 49"
                  fill
                  priority
                  sizes={`${FACE_SIZE}px`}
                  className="object-contain"
                />
              </div>

              {/* back face */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  transform: `rotateY(180deg) translateZ(${THICKNESS / 2}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="/images/hero/watch-back.svg"
                  alt=""
                  aria-hidden
                  fill
                  sizes={`${FACE_SIZE}px`}
                  className="object-contain"
                />
              </div>

              {/* side wall — thin strips faking a cylindrical case edge */}
              {strips.map((strip) => (
                <div
                  key={strip.angle}
                  className="absolute top-1/2 left-1/2 rounded-[2px]"
                  style={{
                    width: `${STRIP_WIDTH}px`,
                    height: `${THICKNESS}px`,
                    marginLeft: `${-STRIP_WIDTH / 2}px`,
                    marginTop: `${-THICKNESS / 2}px`,
                    backgroundImage: `linear-gradient(180deg, ${METAL}, ${METAL_DARK})`,
                    filter: `brightness(${strip.shade})`,
                    transform: `rotateY(${strip.angle}deg) translateZ(${RADIUS - 1}px)`,
                    backfaceVisibility: "hidden",
                  }}
                />
              ))}
            </div>

            {/* contact shadow grounding the puck */}
            <div
              className="absolute -bottom-8 left-1/2 -z-10 h-8 -translate-x-1/2 rounded-full bg-ink/18 blur-xl"
              style={{ width: FACE_SIZE * 0.8 }}
            />
          </div>

          {!reduced ? (
            <div
              className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 lg:block"
              style={{ opacity: textOpacity }}
            >
              <div className="h-14 w-px bg-gradient-to-b from-transparent via-ink/20 to-ink/40" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
