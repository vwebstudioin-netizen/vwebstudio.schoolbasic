import Link from "next/link";
import { publicNavLinks } from "@/lib/constants";
import { SocialLinks } from "./SocialLinks";
import { Logo } from "@/components/shared/Logo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "School";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const address = process.env.NEXT_PUBLIC_SCHOOL_ADDRESS;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-primary bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 - About */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-text-secondary leading-relaxed">
              {process.env.NEXT_PUBLIC_SCHOOL_TAGLINE ||
                "Committed to providing quality education and nurturing future leaders."}
            </p>
            <SocialLinks />
          </div>

          {/* Col 2 - Quick links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {publicNavLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - More links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              {publicNavLinks.slice(6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-text-secondary hover:text-primary-600 transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text-primary uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              {address && <li>📍 {address}</li>}
              {phone && (
                <li>
                  📞{" "}
                  <a href={`tel:${phone}`} className="hover:text-primary-600 transition-colors">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  ✉️{" "}
                  <a href={`mailto:${email}`} className="hover:text-primary-600 transition-colors">
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {year} {schoolName}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Powered by{" "}
            <a
              href={process.env.NEXT_PUBLIC_DEVELOPER_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              {process.env.NEXT_PUBLIC_DEVELOPER_NAME || "Developer"}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
