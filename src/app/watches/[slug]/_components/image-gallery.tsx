"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const safeImages = images.length > 0 ? images : ["/product/17.jpg"];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — square, clean */}
      <div className="relative aspect-square w-full overflow-hidden border border-hairline bg-[#f5f2ec]">
        <Image
          key={safeImages[selected]}
          src={safeImages[selected]}
          alt={`${name}`}
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-center transition-opacity duration-200"
        />
      </div>

      {/* Thumbnails — compact horizontal strip */}
      {safeImages.length > 1 && (
        <div className="flex gap-2">
          {safeImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View ${i + 1}`}
              aria-pressed={i === selected}
              className={`relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden border transition-colors duration-150 ${
                i === selected ? "border-gold" : "border-hairline hover:border-stone/40"
              }`}
            >
              <Image src={src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
