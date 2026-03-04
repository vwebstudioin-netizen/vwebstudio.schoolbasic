import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data found",
  description = "There are no items to display right now.",
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="mb-4 text-text-muted">
        {icon || <Inbox className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
