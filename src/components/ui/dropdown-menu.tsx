"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({ trigger, children, align = "left", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] rounded-lg border border-border-primary bg-surface-primary shadow-lg py-1 animate-fade-in",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  destructive?: boolean;
}

export function DropdownItem({ children, onClick, className, destructive }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors cursor-pointer",
        destructive
          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          : "text-text-primary hover:bg-surface-secondary",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-border-primary" />;
}
