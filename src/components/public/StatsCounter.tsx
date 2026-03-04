"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsCounter({ stats, className }: StatsCounterProps) {
  return (
    <section
      className={cn(
        "bg-primary-600 dark:bg-primary-700 py-12 sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-white sm:text-4xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
