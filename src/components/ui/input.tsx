import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error focus-visible:ring-error",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
