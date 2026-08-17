"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/input";

export type Facets = {
  materials: string[];
  collections: { name: string; slug: string }[];
  connectivity: string[];
  minCents: number;
  maxCents: number;
  sizeBuckets: { id: string; label: string }[];
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

function readList(params: URLSearchParams, key: string) {
  const raw = params.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

export function FilterSidebar({
  facets,
  showCollections = true,
  resultCount,
}: {
  facets: Facets;
  showCollections?: boolean;
  resultCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const collection = readList(searchParams, "collection");
  const material = readList(searchParams, "material");
  const connectivity = readList(searchParams, "connectivity");
  const size = readList(searchParams, "size");
  const sort = searchParams.get("sort") ?? "featured";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";

  const activeCount =
    collection.length +
    material.length +
    connectivity.length +
    size.length +
    (min ? 1 : 0) +
    (max ? 1 : 0);

  function update(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    router.push(`${pathname}${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  }

  function toggle(key: string, value: string) {
    update((params) => {
      const current = readList(params, key);
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (next.length) params.set(key, next.join(","));
      else params.delete(key);
    });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const dollarMin = Math.floor(facets.minCents / 100);
  const dollarMax = Math.ceil(facets.maxCents / 100);

  return (
    <>
      <div className="flex items-center justify-between border-b border-ink/10 pb-5 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="eyebrow flex items-center gap-2 text-ink"
        >
          Filters {activeCount ? `(${activeCount})` : ""}
        </button>
        <p className="text-xs text-stone">{resultCount} results</p>
      </div>

      <aside
        className={cn(
          "lg:block",
          mobileOpen ? "block" : "hidden",
          "space-y-10 pt-8 lg:pt-0",
        )}
      >
        <div className="hidden items-center justify-between lg:flex">
          <p className="eyebrow text-ink">Filter</p>
          {activeCount ? (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs text-stone underline-offset-4 hover:text-gold-dark hover:underline"
            >
              Clear all <X className="h-3 w-3" strokeWidth={1.5} />
            </button>
          ) : null}
        </div>

        <div>
          <p className="eyebrow mb-4 text-stone">Sort</p>
          <Select
            value={sort}
            onChange={(e) =>
              update((params) => {
                if (e.target.value === "featured") params.delete("sort");
                else params.set("sort", e.target.value);
              })
            }
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {showCollections ? (
          <FilterGroup title="Collection">
            {facets.collections.map((c) => (
              <Checkbox
                key={c.slug}
                label={c.name}
                checked={collection.includes(c.slug)}
                onChange={() => toggle("collection", c.slug)}
              />
            ))}
          </FilterGroup>
        ) : null}

        <FilterGroup title="Case Size">
          {facets.sizeBuckets.map((b) => (
            <Checkbox
              key={b.id}
              label={b.label}
              checked={size.includes(b.id)}
              onChange={() => toggle("size", b.id)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Material">
          {facets.materials.map((m) => (
            <Checkbox
              key={m}
              label={m}
              checked={material.includes(m)}
              onChange={() => toggle("material", m)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Connectivity">
          {facets.connectivity.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={connectivity.includes(c)}
              onChange={() => toggle("connectivity", c)}
            />
          ))}
        </FilterGroup>

        <div>
          <p className="eyebrow mb-4 text-stone">
            Price ({dollarMin.toLocaleString()} – {dollarMax.toLocaleString()}
            )
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder={String(dollarMin)}
              defaultValue={min ? Number(min) / 100 : ""}
              onBlur={(e) =>
                update((params) => {
                  const val = e.target.value;
                  if (val) params.set("min", String(Number(val) * 100));
                  else params.delete("min");
                })
              }
              className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-sm text-ink placeholder:text-stone-light focus:border-gold focus:outline-none"
            />
            <span className="text-stone-light">–</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder={String(dollarMax)}
              defaultValue={max ? Number(max) / 100 : ""}
              onBlur={(e) =>
                update((params) => {
                  const val = e.target.value;
                  if (val) params.set("max", String(Number(val) * 100));
                  else params.delete("max");
                })
              }
              className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-2 text-sm text-ink placeholder:text-stone-light focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </aside>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-4 text-stone">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink/80 transition-colors hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 cursor-pointer accent-gold-dark"
      />
      {label}
    </label>
  );
}
