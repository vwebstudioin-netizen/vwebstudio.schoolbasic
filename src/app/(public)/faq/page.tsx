import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/public/CTABanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { FAQ } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = genMeta({
  title: "FAQ",
  description: "Frequently asked questions about admissions, academics, and more.",
  canonical: "/faq",
});

async function getFAQs() {
  try {
    const snap = await getDocs(
      query(
        collection(db, "faqs"),
        where("isActive", "==", true),
        orderBy("order", "asc")
      )
    );
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as FAQ[];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  // Group FAQs by category
  const grouped = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "FAQ" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our school.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {faqs.length === 0 ? (
            <EmptyState
              title="No FAQs yet"
              description="Frequently asked questions will be added soon."
            />
          ) : (
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, items]) => (
                <ScrollReveal key={category}>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-4 capitalize">
                      {category}
                    </h3>
                    <FAQAccordion faqs={items} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Still Have Questions?"
        subtitle="Our team is here to help. Don't hesitate to reach out."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
