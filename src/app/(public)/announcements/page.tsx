import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { Announcement } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = genMeta({
  title: "Announcements",
  description: "Important announcements and notices from our school.",
  canonical: "/announcements",
});

async function getAnnouncements() {
  try {
    const snap = await getDocs(
      query(
        collection(db, "announcements"),
        where("isActive", "==", true),
        orderBy("publishDate", "desc")
      )
    );
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Announcement[];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Announcements" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Announcements
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Stay informed with the latest announcements and notices.
          </p>
        </div>
      </section>

      {/* Announcements list */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {announcements.length === 0 ? (
            <EmptyState
              title="No announcements"
              description="There are no active announcements at the moment."
            />
          ) : (
            <div className="space-y-4">
              {announcements.map((a, idx) => {
                const date = a.publishDate?.toDate?.() ?? new Date();
                return (
                  <ScrollReveal key={a.id} delay={idx * 0.05}>
                    <Card>
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={
                                  a.category === "urgent"
                                    ? "error"
                                    : a.category === "admissions"
                                    ? "success"
                                    : "info"
                                }
                              >
                                {a.category}
                              </Badge>
                              {a.isPinned && (
                                <Badge variant="warning">📌 Pinned</Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary">
                              {a.title}
                            </h3>
                            <p className="mt-1 text-sm text-text-secondary">
                              {a.excerpt}
                            </p>
                          </div>
                          <time className="text-xs text-text-muted whitespace-nowrap">
                            {formatDate(date)}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
