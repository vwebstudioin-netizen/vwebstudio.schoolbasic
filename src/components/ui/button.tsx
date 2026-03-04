import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            // Variants
            "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm":
              variant === "primary",
            "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 shadow-sm":
              variant === "secondary",
            "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100":
              variant === "outline",
            "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary":
              variant === "ghost",
            "bg-error text-white hover:bg-red-600 active:bg-red-700 shadow-sm":
              variant === "destructive",
            // Sizes
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
