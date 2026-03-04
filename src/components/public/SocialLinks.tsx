import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
};

interface SocialLinksProps {
  className?: string;
  iconOnly?: boolean;
}

export function SocialLinks({ className, iconOnly = true }: SocialLinksProps) {
  const links = [
    { key: "facebook", url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK },
    { key: "twitter", url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER },
    { key: "instagram", url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM },
    { key: "youtube", url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map(({ key, url }) => (
        <a
          key={key}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-primary-600 transition-colors"
          aria-label={key}
        >
          {socialIcons[key]}
        </a>
      ))}
    </div>
  );
}
