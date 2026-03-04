import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeMap = { sm: 32, md: 40, lg: 56 };
  const logoUrl = process.env.NEXT_PUBLIC_SCHOOL_LOGO_URL || "/logo.svg";
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_SHORT_NAME || "School";

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoUrl}
        alt={`${schoolName} Logo`}
        width={sizeMap[size]}
        height={sizeMap[size]}
        className="object-contain"
        priority
      />
      <span className="font-bold text-text-primary hidden sm:inline-block">
        {process.env.NEXT_PUBLIC_SCHOOL_SHORT_NAME || "School"}
      </span>
    </Link>
  );
}
