import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusVariants: Record<string, "success" | "warning" | "error" | "info" | "default"> = {
  published: "success",
  active: "success",
  upcoming: "info",
  ongoing: "info",
  draft: "warning",
  inactive: "warning",
  archived: "default",
  past: "default",
  urgent: "error",
  read: "default",
  unread: "warning",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = statusVariants[status.toLowerCase()] || "default";
  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {status}
    </Badge>
  );
}
