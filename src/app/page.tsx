// Root page redirects to public homepage
// The (public) route group handles the actual homepage at (public)/page.tsx
// This file exists because both can't serve "/" — root page.tsx takes priority
export { default } from "./(public)/page";
