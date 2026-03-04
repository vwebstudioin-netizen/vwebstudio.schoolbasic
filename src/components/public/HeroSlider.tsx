"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="relative h-[60vh] min-h-[400px] bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {process.env.NEXT_PUBLIC_SCHOOL_NAME || "Welcome to Our School"}
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            {process.env.NEXT_PUBLIC_SCHOOL_TAGLINE || "Excellence in Education"}
          </p>
        </div>
      </div>
    );
  }

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative h-[60vh] min-h-[400px] lg:h-[70vh] overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            className="object-cover"
            priority={current === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto max-w-3xl px-4 text-center text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                {slide.title}
              </motion.h1>
              {slide.subtitle && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 text-lg md:text-xl text-white/85"
                >
                  {slide.subtitle}
                </motion.p>
              )}
              {slide.ctaText && slide.ctaLink && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-6"
                >
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                  >
                    {slide.ctaText}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  idx === current ? "w-8 bg-white" : "w-2 bg-white/50"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
