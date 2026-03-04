import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  buttonText = "Contact Us",
  buttonLink = "/contact",
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-r from-primary-600 to-primary-700 py-12 sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-white/80 text-lg">{subtitle}</p>}
        <div className="mt-6">
          <Link href={buttonLink}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-700 hover:bg-white/90"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
