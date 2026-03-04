"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
  title?: string;
}

export function Sheet({ open, onClose, children, side = "right", className, title }: SheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const slideVariants = {
    left: {
      hidden: { x: "-100%" },
      visible: { x: 0 },
    },
    right: {
      hidden: { x: "100%" },
      visible: { x: 0 },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants[side]}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className={cn(
              "fixed top-0 z-50 h-full w-80 bg-surface-primary shadow-xl flex flex-col",
              side === "left" ? "left-0" : "right-0",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-primary px-4 py-3">
              <h2 className="font-semibold text-text-primary">
                {title || "Menu"}
              </h2>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-surface-tertiary transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
