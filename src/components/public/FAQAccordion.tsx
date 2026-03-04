"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <div className={cn("space-y-3", className)}>
      {faqs.map((faq, idx) => (
        <div
          key={faq.id}
          className="rounded-lg border border-border-primary overflow-hidden"
        >
          <button
            onClick={() => toggle(idx)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-secondary cursor-pointer"
          >
            <span className="font-medium text-text-primary text-sm sm:text-base">
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
                openIndex === idx && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border-primary px-5 py-4 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
