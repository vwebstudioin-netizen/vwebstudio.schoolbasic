import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { CTABanner } from "@/components/public/CTABanner";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";

export const metadata = genMeta({
  title: "About Us",
  description: "Learn about our school's history, mission, vision, and values.",
  canonical: "/about",
});

export default function AboutPage() {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "Our School";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "About Us" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            About {schoolName}
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Building futures through quality education, strong values, and a nurturing environment.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ScrollReveal variant="fadeInLeft">
              <div className="space-y-6">
                <SectionHeading title="Our Mission" align="left" />
                <p className="text-text-secondary leading-relaxed">
                  To provide a holistic education that empowers students with knowledge,
                  critical thinking skills, and strong moral values. We strive to create
                  an inclusive learning environment where every student can reach their
                  full potential.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeInRight">
              <div className="space-y-6">
                <SectionHeading title="Our Vision" align="left" />
                <p className="text-text-secondary leading-relaxed">
                  To be a leading educational institution recognized for academic
                  excellence, character development, and innovation. We envision a
                  community of lifelong learners who contribute positively to society.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Our Core Values"
              subtitle="The principles that guide everything we do"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Excellence",
                desc: "Pursuing the highest standards in academics, sports, and character.",
                icon: "🏆",
              },
              {
                title: "Integrity",
                desc: "Fostering honesty, transparency, and ethical behavior.",
                icon: "🤝",
              },
              {
                title: "Innovation",
                desc: "Embracing new ideas and modern teaching methodologies.",
                icon: "💡",
              },
              {
                title: "Community",
                desc: "Building a supportive and inclusive school family.",
                icon: "❤️",
              },
            ].map((value, idx) => (
              <ScrollReveal key={value.title} delay={idx * 0.1}>
                <div className="rounded-xl bg-surface-primary p-6 text-center shadow-sm border border-border-primary">
                  <span className="text-4xl">{value.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Our History"
              subtitle="A journey of growth and achievement"
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <p className="text-text-secondary leading-relaxed">
                Founded with a vision to provide quality education, {schoolName} has
                grown from humble beginnings into a premier educational institution.
                Over the years, we have nurtured thousands of students who have gone
                on to excel in various fields. Our commitment to academic excellence,
                character building, and holistic development has remained unwavering
                throughout our journey.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Today, we continue to evolve and adapt to the changing educational
                landscape while staying true to our core values. With state-of-the-art
                facilities, experienced faculty, and a vibrant student community, we
                are proud of the legacy we are building.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Want to Know More?"
        subtitle="Get in touch with us for admissions and general enquiries"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
