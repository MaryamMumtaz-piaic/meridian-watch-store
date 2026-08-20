import Image from "next/image";

const GALLERY_IMAGES = [
  { id: 1,  src: "/gallery/1.jpg",  alt: "Skeleton chronograph" },
  { id: 2,  src: "/gallery/2.jpg",  alt: "Classic dress watch" },
  { id: 3,  src: "/gallery/3.jpg",  alt: "Sport diver" },
  { id: 4,  src: "/gallery/4.jpg",  alt: "Rose gold tourbillon" },
  { id: 5,  src: "/gallery/5.jpg",  alt: "Green dial dress watch" },
  { id: 6,  src: "/gallery/6.jpg",  alt: "Steel bracelet profile" },
  { id: 7,  src: "/gallery/7.jpg",  alt: "Blue dial heritage" },
  { id: 8,  src: "/gallery/8.jpg",  alt: "Moonphase complication" },
  { id: 9,  src: "/gallery/9.jpg",  alt: "Chronograph detail" },
  { id: 10, src: "/gallery/10.jpg", alt: "Diver on stand" },
  { id: 11, src: "/gallery/11.jpg", alt: "Exhibition caseback" },
  { id: 12, src: "/gallery/12.jpg", alt: "Ceramic bezel sport" },
  { id: 13, src: "/gallery/13.jpg", alt: "Pilot lifestyle" },
  { id: 14, src: "/gallery/14.jpg", alt: "Ultra-thin dress" },
  { id: 15, src: "/gallery/15.jpg", alt: "Rose gold on stone" },
  { id: 16, src: "/gallery/16.jpg", alt: "Vintage cushion case" },
  { id: 17, src: "/gallery/18.jpg", alt: "Open-heart automatic" },
  { id: 18, src: "/gallery/19.jpg", alt: "Titanium field watch" },
  { id: 19, src: "/gallery/20.jpg", alt: "Skeleton on wrist" },
  { id: 20, src: "/gallery/21.jpg", alt: "Integrated bracelet" },
  { id: 21, src: "/gallery/22.jpg", alt: "Platinum dress watch" },
  { id: 22, src: "/gallery/23.jpg", alt: "Green sunburst dial" },
  { id: 23, src: "/gallery/24.jpg", alt: "Retrograde seconds" },
  { id: 24, src: "/gallery/25.jpg", alt: "Annual calendar" },
];

// 8 columns, each with 3 images — masonry-style distribution
const COLUMNS = [
  [GALLERY_IMAGES[0],  GALLERY_IMAGES[8],  GALLERY_IMAGES[16]],
  [GALLERY_IMAGES[1],  GALLERY_IMAGES[9],  GALLERY_IMAGES[17]],
  [GALLERY_IMAGES[2],  GALLERY_IMAGES[10], GALLERY_IMAGES[18]],
  [GALLERY_IMAGES[3],  GALLERY_IMAGES[11], GALLERY_IMAGES[19]],
  [GALLERY_IMAGES[4],  GALLERY_IMAGES[12], GALLERY_IMAGES[20]],
  [GALLERY_IMAGES[5],  GALLERY_IMAGES[13], GALLERY_IMAGES[21]],
  [GALLERY_IMAGES[6],  GALLERY_IMAGES[14], GALLERY_IMAGES[22]],
  [GALLERY_IMAGES[7],  GALLERY_IMAGES[15], GALLERY_IMAGES[23]],
];

// Duplicate columns for seamless infinite loop
const LOOP_COLUMNS = [...COLUMNS, ...COLUMNS];

export function WatchGallery() {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-24">

      {/* keyframes */}
      <style>{`
        @keyframes masonry-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .masonry-track {
          animation: masonry-slide 45s linear infinite;
        }
        .masonry-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            Visual Archive
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            The&nbsp;<em className="not-italic text-gold">Gallery</em>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-stone/60">
            Every reference, every angle — captured in detail.
          </p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-px w-10 bg-gold/40" />
            <div className="h-[5px] w-[5px] rotate-45 bg-gold/70" />
            <div className="h-px w-10 bg-gold/40" />
          </div>
        </div>
      </div>

      {/* ── Moving Pinterest Masonry ── */}
      <div className="overflow-hidden">
        <div className="masonry-track flex gap-[10px] w-max cursor-pointer">
          {LOOP_COLUMNS.map((column, colIdx) => (
            <div
              key={colIdx}
              className="flex w-[190px] flex-col gap-[10px] sm:w-[210px] lg:w-[230px]"
            >
              {column.map((img, imgIdx) => (
                <div
                  key={`${colIdx}-${imgIdx}`}
                  className="group relative overflow-hidden bg-[#f0f0f0] transition-all duration-300 hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.25)]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={460}
                    height={620}
                    sizes="230px"
                    className="block w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    style={{ height: "auto" }}
                  />
                  {/* gold top flash */}
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  {/* caption on hover */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 via-black/20 to-transparent pb-3 pt-8 transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <p className="px-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/90 line-clamp-1">
                      {img.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hint ── */}
      <div className="mt-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.24em] text-stone/30">
          Hover to pause &nbsp;·&nbsp; 24 references &nbsp;·&nbsp; Maison Temps
        </p>
      </div>

    </section>
  );
}
