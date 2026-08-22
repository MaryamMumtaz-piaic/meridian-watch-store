"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const COLLECTIONS = [
  { value: "all", label: "All Collections" },
  { value: "aero", label: "Aero" },
  { value: "pulse", label: "Pulse" },
  { value: "studio", label: "Studio" },
  { value: "summit", label: "Summit" },
];

const SORT_OPTIONS = [
  { value: "new", label: "Newest First" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "best", label: "Featured First" },
];

export function SidebarFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCollection = searchParams.get("collection") ?? "all";
  const activeSort = searchParams.get("sort") ?? "new";

  const hasActive =
    searchParams.get("collection") || (searchParams.get("sort") && searchParams.get("sort") !== "new");

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="lg:sticky lg:top-24 flex flex-col gap-7">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink">
              Filter
            </span>
          </div>
          {hasActive && (
            <button
              type="button"
              onClick={() => router.push(pathname, { scroll: false })}
              className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-stone/60 transition-colors hover:text-gold"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {/* Collections */}
        <div>
          <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
            Collection
          </p>
          <div className="flex flex-col gap-2.5">
            {COLLECTIONS.map((col) => {
              const isActive = activeCollection === col.value;
              return (
                <button
                  key={col.value}
                  type="button"
                  onClick={() =>
                    updateParam("collection", col.value === "all" ? null : col.value)
                  }
                  className={`flex items-center gap-3 text-left text-[13px] transition-colors duration-150 ${
                    isActive ? "font-semibold text-ink" : "font-normal text-stone hover:text-ink"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full border transition-all duration-150 ${
                      isActive ? "border-gold bg-gold" : "border-stone/35"
                    }`}
                  />
                  {col.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-hairline" />

        {/* Sort */}
        <div>
          <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
            Sort By
          </p>
          <div className="flex flex-col gap-2.5">
            {SORT_OPTIONS.map((opt) => {
              const isActive = activeSort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateParam("sort", opt.value)}
                  className={`flex items-center gap-3 text-left text-[13px] transition-colors duration-150 ${
                    isActive ? "font-semibold text-ink" : "font-normal text-stone hover:text-ink"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full border transition-all duration-150 ${
                      isActive ? "border-gold bg-gold" : "border-stone/35"
                    }`}
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-hairline" />

        {/* In Stock label */}
        <p className="text-[10px] leading-relaxed text-stone/50">
          All watches are in-stock and ready to ship within 2–3 business days.
        </p>
      </div>
    </aside>
  );
}
