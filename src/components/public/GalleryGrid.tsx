"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

interface GalleryGridProps {
  images: GalleryImage[];
  className?: string;
}

export function GalleryGrid({ images, className }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );

  return (
    <>
      {/* Grid */}
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
          className
        )}
      >
        {images.map((image, idx) => (
          <motion.div
            key={image.url}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={image.url}
              alt={image.caption || `Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
              {image.caption && (
                <p className="p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity line-clamp-1">
                  {image.caption}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              className="relative h-[80vh] w-[90vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].caption || "Gallery image"}
                fill
                className="object-contain"
              />
              {images[lightboxIndex].caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-center text-sm text-white">
                  {images[lightboxIndex].caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
