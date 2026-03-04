"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
  hint?: string;
}

export function FormField({
  label,
  name,
  error,
  required,
  className,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
