"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicNavLinks } from "@/lib/constants";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "border-border-primary bg-surface-primary/95 backdrop-blur-md shadow-sm"
            : "border-transparent bg-surface-primary"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-primary-600 bg-primary-50 dark:bg-primary-950/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-9 w-9 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-tertiary transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
