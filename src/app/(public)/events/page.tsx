import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventCard } from "@/components/public/EventCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/shared/EmptyState";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { SchoolEvent } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = genMeta({
  title: "Events",
  description: "Stay updated with upcoming and past school events.",
  canonical: "/events",
});

async function getEvents() {
  try {
    const snap = await getDocs(
      query(
        collection(db, "events"),
        where("isActive", "==", true),
        orderBy("startDate", "desc")
      )
    );
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SchoolEvent[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Events" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            School Events
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Discover our upcoming and past events, celebrations, and activities.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <EmptyState
              title="No events yet"
              description="Check back soon for upcoming events."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.05}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
