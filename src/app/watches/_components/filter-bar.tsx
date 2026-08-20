"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const COLLECTIONS = ["All", "Aero", "Pulse", "Studio", "Summit"];
const SORT_OPTIONS = [
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best", label: "Featured First" },
];

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCollection = searchParams.get("collection") ?? "All";
  const activeSort = searchParams.get("sort") ?? "new";

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Collection pills */}
      <div className="flex flex-wrap items-center gap-2">
        {COLLECTIONS.map((col) => {
          const isActive = col === "All" ? activeCollection === "All" : activeCollection === col.toLowerCase();
          return (
            <button
              key={col}
              type="button"
              onClick={() => updateParam("collection", col === "All" ? null : col.toLowerCase())}
              className={`cursor-pointer border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                isActive
                  ? "border-gold bg-gold text-white"
                  : "border-hairline bg-background text-stone hover:border-gold hover:text-gold"
              }`}
            >
              {col}
            </button>
          );
        })}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-3">
        <label
          htmlFor="sort-select"
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-stone"
        >
          Sort
        </label>
        <select
          id="sort-select"
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="cursor-pointer border border-hairline bg-background px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground focus:border-gold focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
