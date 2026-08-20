"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors hover:text-gold"
            >
              <span className="font-serif text-base text-foreground leading-snug">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                strokeWidth={2}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-stone">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
