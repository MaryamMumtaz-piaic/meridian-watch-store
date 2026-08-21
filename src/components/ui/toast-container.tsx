"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useToastStore, type Toast } from "@/lib/store/toast";

/* ── Single toast card ──────────────────────────────────────────────── */
function ToastCard({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const [visible, setVisible] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(onRemove, 300); // wait for exit animation
  }

  const isCart = toast.type === "cart";

  const iconMap = {
    cart: <ShoppingBag className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  };

  const accentMap = {
    cart: "text-[#a16207]",
    success: "text-emerald-600",
    error: "text-rose-600",
    info: "text-sky-600",
  };

  const stripMap = {
    cart: "bg-[#a16207]",
    success: "bg-emerald-500",
    error: "bg-rose-500",
    info: "bg-sky-500",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 1.5rem))",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
      }}
      className="relative flex w-80 overflow-hidden rounded-xl bg-white shadow-[0_8px_32px_-4px_rgba(20,17,15,0.18),0_2px_8px_-2px_rgba(20,17,15,0.10)] ring-1 ring-black/[0.05]"
    >
      {/* Left colour strip */}
      <div className={`w-[3px] shrink-0 ${stripMap[toast.type]}`} />

      {/* Body */}
      <div className="flex flex-1 items-center gap-3 px-3.5 py-3">
        {/* Product image or icon */}
        {isCart && toast.image ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#e4dfd3] bg-[#faf8f4]">
            <Image src={toast.image} alt={toast.title} fill sizes="48px" className="object-cover" />
          </div>
        ) : (
          <span className={`shrink-0 ${accentMap[toast.type]}`}>{iconMap[toast.type]}</span>
        )}

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b645c]">
            {isCart && <ShoppingBag className="h-3 w-3 text-[#a16207]" />}
            {isCart ? "Added to Cart" : toast.type === "success" ? "Done" : toast.type === "error" ? "Error" : "Notice"}
          </p>
          <p className="mt-0.5 truncate text-[13px] font-medium leading-snug text-[#1c1917]">
            {toast.title}
          </p>
          {toast.price && (
            <p className="mt-0.5 font-mono text-[12px] text-[#a16207]">{toast.price}</p>
          )}
          {toast.description && !toast.price && (
            <p className="mt-0.5 text-[11px] leading-snug text-[#6b645c]">{toast.description}</p>
          )}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="absolute right-2.5 top-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#b0a89e] transition-colors hover:text-[#1c1917]"
      >
        <X className="h-3 w-3" />
      </button>

      {/* Auto-dismiss progress bar */}
      <ProgressBar duration={4000} accentClass={stripMap[toast.type]} />
    </div>
  );
}

function ProgressBar({ duration, accentClass }: { duration: number; accentClass: string }) {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const elapsed = now - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setWidth(remaining);
      if (remaining > 0) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/[0.04]">
      <div
        className={`h-full ${accentClass} opacity-50 transition-none`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

/* ── Container ──────────────────────────────────────────────────────── */
export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-5 z-[10000] flex flex-col-reverse gap-2.5"
    >
      {toasts.map((toast) => (
        <ToastCard
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
