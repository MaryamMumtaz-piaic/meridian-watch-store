"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const safeImages = images.length > 0 ? images : ["/product/17.jpg"];

  const prev = useCallback(
    () => setSelected((i) => (i === 0 ? safeImages.length - 1 : i - 1)),
    [safeImages.length]
  );
  const next = useCallback(
    () => setSelected((i) => (i === safeImages.length - 1 ? 0 : i + 1)),
    [safeImages.length]
  );

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-4 lg:self-start">

      {/* ── Main image ── */}
      <div
        className="group relative w-full overflow-hidden rounded-2xl bg-[#faf8f4]"
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          key={safeImages[selected]}
          src={safeImages[selected]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 440px, 100vw"
          className="object-contain object-top p-5 transition-opacity duration-300"
        />

        {/* Prev / Next — visible only when multiple images */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-md opacity-0 transition-all duration-200 group-hover:opacity-100 hover:shadow-lg"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-md opacity-0 transition-all duration-200 group-hover:opacity-100 hover:shadow-lg"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`Image ${i + 1}`}
                  className={`cursor-pointer rounded-full transition-all duration-200 ${
                    i === selected
                      ? "w-5 h-1 bg-ink"
                      : "w-1.5 h-1 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-0.5">
          {safeImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === selected}
              className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[#faf8f4] transition-all duration-150 ${
                i === selected
                  ? "ring-2 ring-gold ring-offset-1"
                  : "opacity-50 hover:opacity-90 hover:ring-1 hover:ring-hairline"
              }`}
            >
              <Image
                src={src}
                alt={`${name} — view ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
