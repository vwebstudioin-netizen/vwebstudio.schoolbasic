"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialSlider({ testimonials, className }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Quote className="mx-auto mb-4 h-8 w-8 text-primary-400" />
          <p className="text-lg text-text-secondary leading-relaxed italic">
            &ldquo;{testimonial.content}&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            {testimonial.imageUrl && (
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">
                {testimonial.name}
              </p>
              <p className="text-xs text-text-muted">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="h-8 w-8 rounded-full border border-border-primary flex items-center justify-center hover:bg-surface-secondary transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors cursor-pointer",
                  idx === current
                    ? "bg-primary-600"
                    : "bg-border-primary hover:bg-text-muted"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="h-8 w-8 rounded-full border border-border-primary flex items-center justify-center hover:bg-surface-secondary transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
