"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  SlidersHorizontal,
  FileText,
  CalendarDays,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: SlidersHorizontal },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border-primary bg-surface-primary transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border-primary px-3">
        {!collapsed && <Logo size="sm" />}
        <button
          onClick={onToggle}
          className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center hover:bg-surface-tertiary transition-colors cursor-pointer",
            collapsed && "mx-auto"
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 text-text-secondary transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? link.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border-primary p-2">
        <button
          onClick={signOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 transition-colors cursor-pointer",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
