import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-text-secondary hover:bg-surface-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-text-muted">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-9 w-9 rounded-lg text-sm font-medium transition-colors cursor-pointer",
              currentPage === page
                ? "bg-primary-600 text-white"
                : "text-text-secondary hover:bg-surface-tertiary"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-text-secondary hover:bg-surface-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

export { Pagination };
