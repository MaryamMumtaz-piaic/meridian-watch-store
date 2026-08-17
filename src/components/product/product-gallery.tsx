"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [active, setActive] = React.useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:gap-5">
      <div className="relative aspect-square flex-1 overflow-hidden bg-cream-dark">
        {current ? (
          <Image
            src={current.url}
            alt={current.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden bg-cream-dark transition-opacity sm:w-full",
                active === i
                  ? "opacity-100 ring-1 ring-gold-dark"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
