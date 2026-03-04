"use client";

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function Dialog({ open, onClose, children, className }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className={cn(
          "relative z-50 w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-xl animate-fade-in-up mx-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

function DialogTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold text-text-primary", className)} {...props}>
      {children}
    </h2>
  );
}

function DialogDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-text-secondary mt-1", className)} {...props}>
      {children}
    </p>
  );
}

function DialogClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 rounded-full p-1 text-text-muted hover:text-text-primary hover:bg-surface-tertiary transition-colors"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

function DialogFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter };
