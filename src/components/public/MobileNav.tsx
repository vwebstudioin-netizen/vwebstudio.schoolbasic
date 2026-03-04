"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { publicNavLinks } from "@/lib/constants";
import { Sheet } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onClose={onClose} side="left" title="Navigation">
      <div className="mb-6">
        <Logo size="lg" />
      </div>
      <nav className="flex flex-col gap-1">
        {publicNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
              pathname === link.href
                ? "text-primary-600 bg-primary-50 dark:bg-primary-950/30"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Contact info at bottom */}
      <div className="mt-auto pt-6 border-t border-border-primary text-sm text-text-secondary space-y-2">
        {process.env.NEXT_PUBLIC_CONTACT_PHONE && (
          <p>📞 {process.env.NEXT_PUBLIC_CONTACT_PHONE}</p>
        )}
        {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
          <p>✉️ {process.env.NEXT_PUBLIC_CONTACT_EMAIL}</p>
        )}
      </div>
    </Sheet>
  );
}
