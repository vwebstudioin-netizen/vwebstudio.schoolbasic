import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a Firestore Timestamp or Date to a readable string
 */
export function formatDate(date: Date | { seconds: number; nanoseconds: number }, fmt: string = "MMM dd, yyyy"): string {
  const d = date instanceof Date ? date : new Date(date.seconds * 1000);
  return format(d, fmt);
}

/**
 * Format date as relative time ("2 hours ago", "3 days ago")
 */
export function formatRelativeDate(date: Date | { seconds: number; nanoseconds: number }): string {
  const d = date instanceof Date ? date : new Date(date.seconds * 1000);
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Strip HTML tags from a string (for excerpts)
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Calculate reading time from HTML content
 */
export function calculateReadingTime(content: string): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Format file size from bytes to human-readable
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get the school name from env
 */
export function getSchoolName(): string {
  return process.env.NEXT_PUBLIC_SCHOOL_NAME || "School Name";
}

/**
 * Get the site URL from env
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
