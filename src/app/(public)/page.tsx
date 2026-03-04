import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HeroSlider } from "@/components/public/HeroSlider";
import { AnnouncementBar } from "@/components/public/AnnouncementBar";
import { SectionHeading } from "@/components/public/SectionHeading";
import { StatsCounter } from "@/components/public/StatsCounter";
import { BlogCard } from "@/components/public/BlogCard";
import { EventCard } from "@/components/public/EventCard";
import { TestimonialSlider } from "@/components/public/TestimonialSlider";
import { CTABanner } from "@/components/public/CTABanner";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { defaultStats } from "@/lib/constants";
import type { HeroSlide, Announcement, Post, SchoolEvent } from "@/types";

export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
    // Fetch hero slides
    const slidesSnap = await getDocs(
      query(collection(db, "heroSlides"), where("isActive", "==", true), orderBy("order", "asc"))
    );
    const slides = slidesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as HeroSlide[];

    // Fetch latest active announcement
    const announcementsSnap = await getDocs(
      query(
        collection(db, "announcements"),
        where("isActive", "==", true),
        where("isPinned", "==", true),
        orderBy("publishDate", "desc"),
        limit(1)
      )
    );
    const announcement = announcementsSnap.docs.length > 0
      ? ({ id: announcementsSnap.docs[0].id, ...announcementsSnap.docs[0].data() } as Announcement)
      : null;

    // Fetch latest blog posts
    const postsSnap = await getDocs(
      query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        limit(3)
      )
    );
    const posts = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];

    // Fetch upcoming events
    const eventsSnap = await getDocs(
      query(
        collection(db, "events"),
        where("isActive", "==", true),
        orderBy("startDate", "asc"),
        limit(3)
      )
    );
    const events = eventsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SchoolEvent[];

    return { slides, announcement, posts, events };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { slides: [], announcement: null, posts: [], events: [] };
  }
}

// Static testimonials for basic tier (configurable)
const testimonials = [
  {
    id: "1",
    name: "Parent Name",
    role: "Parent",
    content:
      "This school has been an incredible journey for my child. The teachers are dedicated and the environment is nurturing.",
  },
  {
    id: "2",
    name: "Alumni Name",
    role: "Alumni, Class of 2023",
    content:
      "The values and education I received here have shaped who I am today. I'm grateful for every moment.",
  },
  {
    id: "3",
    name: "Student Name",
    role: "Current Student",
    content:
      "I love studying here! The facilities are great and the teachers really care about our growth.",
  },
];

export default async function HomePage() {
  const { slides, announcement, posts, events } = await getHomeData();

  return (
    <>
      {/* Announcement Bar */}
      <AnnouncementBar announcement={announcement} />

      {/* Hero Slider */}
      <HeroSlider slides={slides} />

      {/* Stats Counter */}
      <StatsCounter stats={defaultStats} />

      {/* Latest News */}
      {posts.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Latest News"
                subtitle="Stay updated with the latest happenings at our school"
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 0.1}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="bg-surface-secondary py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Upcoming Events"
                subtitle="Don't miss out on our exciting upcoming events"
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.1}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="What People Say"
              subtitle="Hear from our parents, students, and alumni"
            />
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialSlider testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Join Our School?"
        subtitle="Admissions are now open. Take the first step towards a brighter future."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
