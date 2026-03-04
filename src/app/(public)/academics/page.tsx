import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { CTABanner } from "@/components/public/CTABanner";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";

export const metadata = genMeta({
  title: "Academics",
  description: "Explore our academic programs, curriculum, and educational approach.",
  canonical: "/academics",
});

const programs = [
  {
    title: "Pre-Primary (Nursery - KG)",
    description:
      "A play-based learning approach that builds a strong foundation through activities, storytelling, and creative exploration.",
    features: ["Activity-based learning", "Phonics & early literacy", "Art & craft", "Physical development"],
  },
  {
    title: "Primary School (Grades 1-5)",
    description:
      "A comprehensive curriculum developing core academic skills along with critical thinking and creativity.",
    features: ["Core subjects", "Environmental studies", "Computer education", "Co-curricular activities"],
  },
  {
    title: "Middle School (Grades 6-8)",
    description:
      "Building on foundational knowledge with deeper subject exploration and skill development.",
    features: ["Advanced sciences", "Mathematics", "Languages", "Social studies"],
  },
  {
    title: "Secondary School (Grades 9-10)",
    description:
      "Board-aligned curriculum with focused preparation for board examinations and future academic pursuits.",
    features: ["Board curriculum", "Lab practicals", "Career guidance", "Competitive exam prep"],
  },
  {
    title: "Senior Secondary (Grades 11-12)",
    description:
      "Specialized streams with in-depth study for higher education and career readiness.",
    features: ["Science stream", "Commerce stream", "Humanities stream", "Entrance exam coaching"],
  },
];

const facilities = [
  { icon: "🔬", title: "Science Labs", desc: "Well-equipped Physics, Chemistry, and Biology laboratories" },
  { icon: "💻", title: "Computer Lab", desc: "Modern computer lab with internet connectivity" },
  { icon: "📚", title: "Library", desc: "Extensive collection of books and digital resources" },
  { icon: "🏅", title: "Sports", desc: "Multiple sports facilities for physical development" },
  { icon: "🎨", title: "Art Studio", desc: "Creative space for visual arts and crafts" },
  { icon: "🎵", title: "Music Room", desc: "Dedicated space for music education and practice" },
];

export default function AcademicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Academics" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Academic Programs
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            A comprehensive curriculum designed for holistic development and academic excellence.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Our Programs"
              subtitle="Structured learning pathways for every stage of education"
            />
          </ScrollReveal>
          <div className="space-y-8">
            {programs.map((prog, idx) => (
              <ScrollReveal key={prog.title} delay={idx * 0.1}>
                <div className="rounded-xl border border-border-primary bg-surface-primary p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-text-secondary">{prog.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {prog.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-950/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Our Facilities"
              subtitle="World-class infrastructure for a complete learning experience"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((fac, idx) => (
              <ScrollReveal key={fac.title} delay={idx * 0.05}>
                <div className="rounded-xl bg-surface-primary p-6 border border-border-primary text-center">
                  <span className="text-3xl">{fac.icon}</span>
                  <h3 className="mt-2 font-semibold text-text-primary">{fac.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{fac.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Interested in Our Programs?"
        subtitle="Contact us to learn more about admissions and curriculum details"
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
    </>
  );
}
