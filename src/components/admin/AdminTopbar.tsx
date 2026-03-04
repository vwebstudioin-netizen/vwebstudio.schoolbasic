"use client";

import { Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

interface AdminTopbarProps {
  onMenuToggle: () => void;
  title?: string;
}

export function AdminTopbar({ onMenuToggle, title }: AdminTopbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-primary bg-surface-primary/95 backdrop-blur-md px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="h-9 w-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-tertiary transition-colors cursor-pointer lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          className="h-9 w-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-tertiary transition-colors cursor-pointer relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <Avatar
          src={user?.photoURL || undefined}
          fallback={user?.email?.charAt(0).toUpperCase() || "A"}
          size="sm"
        />
      </div>
    </header>
  );
}
