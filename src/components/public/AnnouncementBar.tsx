"use client";

import { useState } from "react";
import { X, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Announcement } from "@/types";

interface AnnouncementBarProps {
  announcement: Announcement | null;
}

export function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!announcement || dismissed) return null;

  const categoryColors: Record<string, string> = {
    general: "bg-primary-600 text-white",
    academic: "bg-primary-600 text-white",
    admissions: "bg-green-600 text-white",
    sports: "bg-amber-500 text-white",
    cultural: "bg-purple-600 text-white",
    urgent: "bg-red-600 text-white",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center gap-2 px-4 py-2 text-sm",
        categoryColors[announcement.category] || categoryColors.general
      )}
    >
      <Megaphone className="h-4 w-4 shrink-0" />
      <p className="line-clamp-1">
        {announcement.title}
        {announcement.content && (
          <span className="ml-1 opacity-85">— {announcement.excerpt}</span>
        )}
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
