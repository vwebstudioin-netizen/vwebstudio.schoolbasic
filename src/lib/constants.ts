import {
  Home,
  Info,
  GraduationCap,
  UserPlus,
  Image,
  Phone,
  Newspaper,
  Calendar,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation Links ───────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: NavLink[];
}

export const publicNavLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Academics", href: "/academics", icon: GraduationCap },
  { label: "Admissions", href: "/admissions", icon: UserPlus },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Contact", href: "/contact", icon: Phone },
];

export const adminNavLinks: NavLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Site Settings", href: "/admin/site-settings" },
  { label: "Hero Slides", href: "/admin/hero-slides" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Blog Posts", href: "/admin/blog" },
  { label: "Events", href: "/admin/events" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "FAQ", href: "/admin/faq" },
  { label: "Contact Submissions", href: "/admin/contact-submissions" },
  { label: "Pages", href: "/admin/pages/about" },
  { label: "Media Library", href: "/admin/media" },
];

// ─── Animation Variants (Framer Motion) ─────────────────────

import type { Variants } from "framer-motion";

export const motionVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  },
};

// ─── Static Content ─────────────────────────────────────────

export const defaultStats = [
  { label: "Students", value: 1200, suffix: "+" },
  { label: "Teachers", value: 50, suffix: "+" },
  { label: "Years", value: 30, suffix: "+" },
  { label: "Achievements", value: 100, suffix: "+" },
];

export const faqCategories = [
  "general",
  "admissions",
  "academics",
  "fees",
  "transport",
] as const;

export const eventCategories = [
  "academic",
  "sports",
  "cultural",
  "pta",
  "holiday",
  "exam",
  "other",
] as const;

export const blogCategories = [
  "School Life",
  "Academics",
  "Sports",
  "Arts & Culture",
  "Achievements",
  "Tips for Parents",
] as const;

export const galleryCategories = [
  "campus",
  "events",
  "sports",
  "cultural",
  "classroom",
  "other",
] as const;

export const contactCategories = [
  "general",
  "admissions",
  "feedback",
  "complaint",
] as const;

export const announcementCategories = [
  "general",
  "academic",
  "admissions",
  "sports",
  "cultural",
  "urgent",
] as const;
