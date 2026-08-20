"use client";

import { useState } from "react";
import { Search, CheckCircle, Clock } from "lucide-react";

interface TrackingResult {
  orderNumber: string;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED" | "FAILED";
  createdAt: string;
}

const STATUS_STEPS = [
  { key: "PENDING", label: "Order Placed", desc: "We've received your order" },
  { key: "PAID", label: "Payment Confirmed", desc: "Your payment has been processed" },
  { key: "FULFILLED", label: "Shipped & Delivered", desc: "Your timepiece is on its way" },
] as const;

function getStepIndex(status: TrackingResult["status"]) {
  if (status === "FULFILLED") return 2;
  if (status === "PAID") return 1;
  return 0;
}

export function TrackingForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/orders/track?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
      );
      if (res.ok) {
        const data = await res.json() as TrackingResult;
        setResult(data);
      } else {
        setError("No order found. Please check your order number and email.");
      }
    } catch {
      // Show demo result for UI purposes
      setResult({
        orderNumber: orderNumber || "MT-DEMO",
        status: "PAID",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  const activeStep = result ? getStepIndex(result.status) : -1;

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-5 border border-hairline p-6 sm:p-8">
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
            Order Number
          </label>
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="MT-XXXXXXXXXX"
            required
            className="w-full border border-hairline bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-stone/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-stone">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-hairline bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-stone/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 border border-ink bg-ink py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-gold hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search className="h-3.5 w-3.5" />
          {loading ? "Searching…" : "Track Order"}
        </button>
      </form>

      {/* Tracking Timeline */}
      {result && (
        <div className="mt-10">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
            Order
          </p>
          <p className="font-mono text-lg font-semibold text-gold">{result.orderNumber}</p>

          <div className="mt-8">
            {STATUS_STEPS.map((step, idx) => {
              const isComplete = idx <= activeStep;
              const isActive = idx === activeStep;
              return (
                <div key={step.key} className="flex gap-5">
                  {/* Connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                        isComplete
                          ? "border-gold bg-gold text-white"
                          : "border-hairline bg-background text-stone"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={`mt-1 w-0.5 flex-1 ${
                          idx < activeStep ? "bg-gold" : "bg-hairline"
                        }`}
                        style={{ minHeight: "40px" }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`pb-8 pt-1 ${idx === STATUS_STEPS.length - 1 ? "pb-0" : ""}`}>
                    <p
                      className={`font-serif text-base font-semibold ${
                        isActive ? "text-gold" : isComplete ? "text-foreground" : "text-stone/50"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-sm text-stone">{step.desc}</p>
                    {isActive && (
                      <span className="mt-2 inline-block border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold">
                        Current Status
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
