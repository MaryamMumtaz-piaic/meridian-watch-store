"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Watch Authentication",
  "Private Consultation",
  "Press",
];

const inputClass =
  "w-full border-b border-hairline bg-transparent py-3 text-sm text-foreground placeholder:text-stone/50 transition-colors focus:border-gold focus:outline-none";
const labelClass = "block text-[11px] font-medium uppercase tracking-[0.14em] text-stone mb-1.5";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  async function onSubmit(_: FormData) {
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <CheckCircle className="h-10 w-10 text-gold" strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-foreground">Message Received</h3>
        <p className="max-w-xs text-sm leading-relaxed text-stone">
          Your message has been received. We&apos;ll respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-gold underline underline-offset-4 hover:text-gold-bright"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div>
        <label htmlFor="name" className={labelClass}>Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          {...register("name", { required: "Name is required" })}
          className={inputClass}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
          })}
          className={inputClass}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <select
          id="subject"
          {...register("subject", { required: "Please select a subject" })}
          className={`${inputClass} cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>Select a topic</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us how we can help…"
          {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please write at least 10 characters" } })}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded border border-destructive/30 bg-destructive/5 px-3 py-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          <p className="text-xs text-destructive">Something went wrong. Please try again.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full cursor-pointer items-center justify-center gap-2 border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-gold hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white" />
            Sending…
          </span>
        ) : (
          <>
            <Send className="h-3.5 w-3.5" strokeWidth={2} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
