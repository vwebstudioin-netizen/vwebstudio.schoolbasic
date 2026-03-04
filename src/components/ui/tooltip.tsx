"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback(() => {
    timeout.current = setTimeout(() => setOpen(true), 200);
  }, []);

  const hide = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(false);
  }, []);

  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {open && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-100 px-2.5 py-1.5 text-xs text-white dark:text-gray-900 shadow-md animate-fade-in",
            positionClasses[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
