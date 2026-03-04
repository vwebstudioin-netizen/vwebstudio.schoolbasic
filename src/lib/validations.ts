import { z } from "zod";

// ─── Contact Form ───────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  subject: z.string().min(2, "Subject is required").max(200),
  category: z.enum(["general", "admissions", "feedback", "complaint"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Admissions Enquiry Form ────────────────────────────────

export const admissionEnquirySchema = z.object({
  parentName: z.string().min(2, "Parent name is required").max(100),
  childName: z.string().min(2, "Child name is required").max(100),
  gradeApplying: z.string().min(1, "Please select a grade"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  email: z.string().email("Please enter a valid email"),
  message: z.string().max(1000).optional(),
});

export type AdmissionEnquiryData = z.infer<typeof admissionEnquirySchema>;

// ─── Admin: Blog Post ───────────────────────────────────────

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  slug: z.string().min(3, "Slug is required").max(200),
  content: z.string().min(10, "Content is required"),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().url("Please upload a cover image").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// ─── Admin: Event ───────────────────────────────────────────

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  slug: z.string().min(3, "Slug is required").max(200),
  description: z.string().min(10, "Description is required"),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().optional(),
  category: z.enum(["academic", "sports", "cultural", "pta", "holiday", "exam", "other"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venue: z.string().min(1, "Venue is required").max(200),
  isAllDay: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;

// ─── Admin: FAQ ─────────────────────────────────────────────

export const faqSchema = z.object({
  question: z.string().min(5, "Question is required").max(500),
  answer: z.string().min(5, "Answer is required"),
  category: z.enum(["admissions", "academics", "fees", "transport", "general"]),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export type FAQFormData = z.infer<typeof faqSchema>;

// ─── Admin: Announcement ────────────────────────────────────

export const announcementSchema = z.object({
  title: z.string().min(3, "Title is required").max(200),
  content: z.string().min(10, "Content is required"),
  excerpt: z.string().max(300).optional(),
  category: z.enum(["general", "academic", "admissions", "sports", "cultural", "urgent"]),
  isPinned: z.boolean().optional(),
  isActive: z.boolean().optional(),
  publishDate: z.string().min(1, "Publish date is required"),
  expiryDate: z.string().optional(),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;

// ─── Admin: Hero Slide ──────────────────────────────────────

export const heroSlideSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  subtitle: z.string().max(300).optional(),
  ctaText: z.string().max(50).optional(),
  ctaLink: z.string().max(200).optional(),
  imageUrl: z.string().url("Please upload an image"),
  mobileImageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export type HeroSlideFormData = z.infer<typeof heroSlideSchema>;

// ─── Admin: Site Settings ───────────────────────────────────

export const siteSettingsSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  shortName: z.string().min(1, "Short name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  logoUrl: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  phoneSecondary: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  admissionsEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  timings: z.string().min(1, "Timings are required"),
  googleMapsEmbedUrl: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional().or(z.literal("")),
    instagram: z.string().optional().or(z.literal("")),
    youtube: z.string().optional().or(z.literal("")),
    twitter: z.string().optional().or(z.literal("")),
    linkedin: z.string().optional().or(z.literal("")),
    whatsapp: z.string().optional().or(z.literal("")),
  }),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
