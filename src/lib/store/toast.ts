import { create } from "zustand";

export type ToastType = "cart" | "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  image?: string;
  price?: string;
}

interface ToastState {
  toasts: Toast[];
  /** Timestamps (ms) of toasts shown in the current sliding window. */
  _window: number[];
  addToast: (toast: Omit<Toast, "id">) => boolean;
  removeToast: (id: string) => void;
}

const RATE_LIMIT = 5;        // max notifications per window
const RATE_WINDOW_MS = 3000; // sliding window duration
const MAX_VISIBLE = 5;       // max toasts on screen at once
const AUTO_DISMISS_MS = 4000;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  _window: [],

  addToast(payload) {
    const now = Date.now();
    const recent = get()._window.filter((t) => now - t < RATE_WINDOW_MS);

    // Rate limit: suppress notification if too many in the window
    if (recent.length >= RATE_LIMIT) {
      // Still update the window so the counter stays accurate
      set({ _window: recent });
      return false;
    }

    const id = crypto.randomUUID();
    const toast: Toast = { ...payload, id };

    set((state) => ({
      // Newest toast first; cap visible list
      toasts: [toast, ...state.toasts].slice(0, MAX_VISIBLE),
      _window: [...recent, now],
    }));

    // Auto-dismiss
    setTimeout(() => get().removeToast(id), AUTO_DISMISS_MS);
    return true;
  },

  removeToast(id) {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

/** Convenience hook */
export function useToast() {
  return useToastStore((s) => s.addToast);
}
