"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motionVariants } from "@/lib/constants";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: keyof typeof motionVariants;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  variant = "fadeInUp",
  className,
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.15 });

  return (
    <div ref={ref} className={cn(className)}>
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={motionVariants[variant]}
            transition={{ delay }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
