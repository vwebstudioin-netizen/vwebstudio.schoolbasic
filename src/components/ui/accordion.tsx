"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

function AccordionItem({ title, children, defaultOpen = false, className }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-border", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary hover:text-primary-600 transition-colors cursor-pointer"
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-text-secondary">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("divide-y divide-border", className)}>{children}</div>;
}

export { Accordion, AccordionItem };
