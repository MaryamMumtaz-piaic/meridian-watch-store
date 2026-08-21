"use client";

import { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Clock } from "lucide-react";
import { quickSearch, type QuickSearchResult } from "@/app/actions/quick-search";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR = ["Chronograph", "Titanium", "Automatic", "Sapphire", "Studio"];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QuickSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Only portal after hydration
  useEffect(() => { setMounted(true); }, []);

  // Lock scroll + user-select on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.userSelect = "none";
      setTimeout(() => inputRef.current?.focus(), 60);
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    } else {
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Debounced live search
  const runSearch = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = value.trim();
    if (trimmed.length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        setResults(await quickSearch(trimmed));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 280);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    setActiveIndex(-1);
    runSearch(value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function handleResultClick() {
    onClose();
    setQuery("");
    setResults([]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) { onClose(); router.push(`/watches/${item.slug}`); }
    }
  }

  // Backdrop click: only close if click landed directly on the backdrop (not the card)
  function handleBackdropPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!cardRef.current?.contains(e.target as Node)) {
      e.preventDefault(); // prevent text selection on hero behind
      onClose();
    }
  }

  if (!mounted || !isOpen) return null;

  const hasResults = results.length > 0;
  const showPopular = query.trim().length === 0;

  return createPortal(
    <div
      onPointerDown={handleBackdropPointerDown}
      className="fixed inset-0 flex items-start justify-center overflow-y-auto px-4 pb-8 pt-[88px]"
      style={{
        zIndex: 9999,
        background: "rgba(20,17,15,0.60)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        userSelect: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        ref={cardRef}
        onPointerDown={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden bg-white"
        style={{
          borderRadius: "1rem",
          boxShadow:
            "0 32px 80px -16px rgba(20,17,15,0.36), 0 8px 24px -4px rgba(20,17,15,0.16)",
          userSelect: "text",
        }}
      >
        {/* ── Input row ── */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-[#e4dfd3] px-5 py-4"
        >
          <Search className="h-[18px] w-[18px] shrink-0 text-[#6b645c]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search watches, collections, movements…"
            className="w-full bg-transparent font-serif text-[1.05rem] leading-snug text-[#1c1917] placeholder:text-[#b0a89e] focus:outline-none"
            aria-label="Search query"
            aria-autocomplete="list"
            aria-expanded={hasResults}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={query ? () => handleChange("") : onClose}
            aria-label={query ? "Clear search" : "Close search"}
            className="shrink-0 cursor-pointer rounded p-0.5 text-[#b0a89e] transition-colors hover:text-[#1c1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        {/* ── Popular suggestions ── */}
        {showPopular && (
          <div className="px-5 py-4">
            <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b0a89e]">
              <Clock className="h-3 w-3" />
              Popular
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleChange(term)}
                  className="cursor-pointer rounded-full border border-[#e4dfd3] px-3.5 py-1.5 text-xs font-medium text-[#6b645c] transition-all duration-200 hover:border-[#a16207] hover:text-[#a16207]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading shimmer ── */}
        {loading && !hasResults && (
          <div className="space-y-px px-2 py-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-md bg-[#f0ece4]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/5 animate-pulse rounded bg-[#f0ece4]" />
                  <div className="h-2.5 w-2/5 animate-pulse rounded bg-[#f0ece4]" />
                </div>
                <div className="h-3 w-14 animate-pulse rounded bg-[#f0ece4]" />
              </div>
            ))}
          </div>
        )}

        {/* ── Results list ── */}
        {hasResults && (
          <ul className="py-1.5" role="listbox">
            {results.map((item, idx) => (
              <li key={item.id} role="option" aria-selected={activeIndex === idx}>
                <Link
                  href={`/watches/${item.slug}`}
                  onClick={handleResultClick}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ${
                    activeIndex === idx ? "bg-[#faf8f4]" : "hover:bg-[#faf8f4]"
                  }`}
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-[#e4dfd3] bg-[#faf8f4]">
                    <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium leading-tight text-[#1c1917]">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#6b645c]">
                      {item.collection} · {item.category}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[13px] text-[#a16207]">{item.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* ── No results ── */}
        {!loading && !hasResults && query.trim().length >= 2 && (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-[#6b645c]">
              No results for{" "}
              <span className="font-medium text-[#1c1917]">&ldquo;{query}&rdquo;</span>
            </p>
            <p className="mt-1 text-xs text-[#b0a89e]">
              Try a collection — Aero, Pulse, Studio — or a material like titanium
            </p>
          </div>
        )}

        {/* ── Footer: view all ── */}
        {query.trim().length >= 2 && (
          <div className="border-t border-[#e4dfd3] px-5 py-3">
            <button
              type="button"
              onClick={() => {
                const trimmed = query.trim();
                if (!trimmed) return;
                onClose();
                router.push(`/search?q=${encodeURIComponent(trimmed)}`);
              }}
              className="flex w-full cursor-pointer items-center justify-between text-[11px] font-semibold uppercase tracking-[0.13em] text-[#a16207] transition-colors hover:text-[#c9a227]"
            >
              <span>View all results for &ldquo;{query}&rdquo;</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
