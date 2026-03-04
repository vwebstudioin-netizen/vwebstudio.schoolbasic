import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface shadow-card overflow-hidden",
        hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 pt-6", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-text-primary", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-text-secondary mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 pb-6 pt-0 flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
