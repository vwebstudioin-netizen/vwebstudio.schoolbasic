import { Timestamp } from "firebase/firestore";

// ─── Site Configuration ─────────────────────────────────────

export interface SiteConfig {
  schoolName: string;
  shortName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  admissionsEmail: string;
  address: string;
  timings: string;
  googleMapsEmbedUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedin: string;
    whatsapp: string;
  };
  seoDefaults: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    keywords: string[];
  };
  announcementBar: {
    enabled: boolean;
    message: string;
    link: string;
    type: "info" | "warning" | "success";
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

// ─── Hero Slides ────────────────────────────────────────────

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  mobileImageUrl: string;
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Announcements ──────────────────────────────────────────

export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: "general" | "academic" | "admissions" | "sports" | "cultural" | "urgent";
  isPinned: boolean;
  isActive: boolean;
  publishDate: Timestamp;
  expiryDate: Timestamp | null;
  attachmentUrl: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

// ─── Blog Posts ─────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatarUrl: string;
  };
  status: "draft" | "published" | "archived";
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  viewCount: number;
  isFeatured: boolean;
}

// ─── Events ─────────────────────────────────────────────────

export interface SchoolEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string;
  category: "academic" | "sports" | "cultural" | "pta" | "holiday" | "exam" | "other";
  startDate: Timestamp;
  endDate: Timestamp;
  startTime: string;
  endTime: string;
  venue: string;
  isAllDay: boolean;
  isActive: boolean;
  gallery: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

// ─── Gallery ────────────────────────────────────────────────

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: "campus" | "events" | "sports" | "cultural" | "classroom" | "other";
  images: GalleryImage[];
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GalleryImage {
  url: string;
  thumbnailUrl: string;
  caption: string;
  order: number;
}

// ─── FAQ ────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "admissions" | "academics" | "fees" | "transport" | "general";
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Contact Submissions ────────────────────────────────────

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: "general" | "admissions" | "feedback" | "complaint";
  status: "new" | "read" | "replied" | "archived";
  adminNotes: string;
  repliedAt: Timestamp | null;
  createdAt: Timestamp;
  ipAddress: string;
}

// ─── Page Content ───────────────────────────────────────────

export interface PageContent {
  pageId: string;
  title: string;
  content: string;
  sections: PageSection[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
  };
  updatedAt: Timestamp;
  updatedBy: string;
}

export interface PageSection {
  id: string;
  heading: string;
  content: string;
  imageUrl: string | null;
  order: number;
  isVisible: boolean;
}

// ─── Media Library ──────────────────────────────────────────

export interface MediaFile {
  id: string;
  fileName: string;
  originalName: string;
  url: string;
  thumbnailUrl: string | null;
  mimeType: string;
  size: number;
  storagePath: string;
  alt: string;
  uploadedBy: string;
  createdAt: Timestamp;
}
