import { cn } from "@/lib/utils";

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  ogImage,
  canonical,
  noIndex,
}: SEOHeadProps) {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "School";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const defaultDescription =
    process.env.NEXT_PUBLIC_SCHOOL_TAGLINE || "Excellence in Education";
  const defaultOgImage = `${siteUrl}/og-image.jpg`;

  const pageTitle = title ? `${title} | ${schoolName}` : schoolName;
  const pageDescription = description || defaultDescription;
  const pageOgImage = ogImage || defaultOgImage;
  const pageCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageCanonical,
      siteName: schoolName,
      images: [{ url: pageOgImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageOgImage],
    },
    ...(canonical && { alternates: { canonical: pageCanonical } }),
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
