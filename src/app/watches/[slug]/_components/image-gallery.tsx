"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);

  const safeImages = images.length > 0 ? images : ["/product/17.jpg"];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-secondary">
        <Image
          key={safeImages[selected]}
          src={safeImages[selected]}
          alt={`${name} — view ${selected + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden border transition-all duration-200 ${
                i === selected
                  ? "border-gold"
                  : "border-hairline hover:border-gold/50"
              }`}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
