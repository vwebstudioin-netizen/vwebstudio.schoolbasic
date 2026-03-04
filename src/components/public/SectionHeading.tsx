import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-3 h-1 w-16 rounded-full bg-primary-600",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
