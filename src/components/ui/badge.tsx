import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary-100 text-primary-800": variant === "default",
          "bg-green-100 text-green-800": variant === "success",
          "bg-amber-100 text-amber-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "error",
          "bg-blue-100 text-blue-800": variant === "info",
          "border border-border text-text-secondary": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
