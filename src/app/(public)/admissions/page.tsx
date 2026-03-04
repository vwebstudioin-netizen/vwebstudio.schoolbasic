import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { CTABanner } from "@/components/public/CTABanner";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { ContactForm } from "@/components/public/ContactForm";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { FAQ } from "@/types";

export const metadata = genMeta({
  title: "Admissions",
  description:
    "Learn about our admissions process, eligibility, fee structure, important dates, and apply now.",
  canonical: "/admissions",
});

const admissionSteps = [
  {
    step: 1,
    title: "Enquiry",
    desc: "Fill out the enquiry form below or visit the school office to learn about our programs and availability.",
    icon: "📝",
  },
  {
    step: 2,
    title: "Application",
    desc: "Submit the application form along with required documents — birth certificate, previous report cards, and photographs.",
    icon: "📄",
  },
  {
    step: 3,
    title: "Assessment",
    desc: "Students appear for an age-appropriate assessment. Parents may be called for an interaction with the principal.",
    icon: "✅",
  },
  {
    step: 4,
    title: "Admission",
    desc: "Upon selection, complete the admission formalities and fee payment. Welcome to the school family!",
    icon: "🎓",
  },
];

const eligibility = [
  { grade: "Nursery / LKG", age: "3–4 years", requirements: "Birth certificate, 4 passport photos" },
  { grade: "UKG / Class I", age: "5–6 years", requirements: "Birth certificate, previous school report (if any)" },
  { grade: "Class II–V", age: "7–10 years", requirements: "Transfer certificate, report card, birth certificate" },
  { grade: "Class VI–VIII", age: "11–13 years", requirements: "Transfer certificate, report card, Aadhaar" },
  { grade: "Class IX–X", age: "14–15 years", requirements: "Transfer certificate, report card, Aadhaar, character certificate" },
  { grade: "Class XI–XII", age: "16–17 years", requirements: "Class X marksheet, transfer certificate, Aadhaar" },
];

const importantDates = [
  { event: "Admission Form Available", date: "January 15" },
  { event: "Open House / Campus Tour", date: "February 1 – February 15" },
  { event: "Last Date for Application", date: "March 31" },
  { event: "Assessment / Interaction", date: "April 10 – April 20" },
  { event: "Results Announced", date: "April 30" },
  { event: "Admission Confirmation & Fee Payment", date: "May 1 – May 15" },
  { event: "Academic Session Begins", date: "June 1 (Tentative)" },
];

const admissionFAQs = [
  {
    id: "adm-1",
    question: "What is the admission process?",
    answer:
      "The process involves four steps: Enquiry → Application → Assessment → Admission. Fill out the enquiry form on this page or visit our office to get started.",
  },
  {
    id: "adm-2",
    question: "What documents are required?",
    answer:
      "Birth certificate, previous school report cards, transfer certificate (for Class II and above), passport-size photographs, and Aadhaar card (for Class VI and above).",
  },
  {
    id: "adm-3",
    question: "Is there an entrance test?",
    answer:
      "Yes, students applying for Class II and above undergo an age-appropriate written assessment. For Nursery to Class I, there is an informal interaction.",
  },
  {
    id: "adm-4",
    question: "Are scholarships available?",
    answer:
      "Yes, we offer merit-based scholarships for outstanding academic and extracurricular performers. Contact the admissions office for details.",
  },
] as unknown as FAQ[];

export default function AdmissionsPage() {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME || "Our School";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Admissions" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Admissions
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Join the {schoolName} family. Admissions are open — begin your child&apos;s journey today.
          </p>
        </div>
      </section>

      {/* Admission Process Timeline */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Admission Process"
              subtitle="Four simple steps to join our school"
            />
          </ScrollReveal>
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-primary hidden sm:block" />
            <div className="space-y-8">
              {admissionSteps.map((step, idx) => (
                <ScrollReveal key={step.step} delay={idx * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-2xl border-4 border-surface-primary shadow-sm">
                      {step.icon}
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        Step {step.step}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Eligibility & Requirements"
              subtitle="Age criteria and documents needed for each grade"
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border-primary bg-surface-primary shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-primary bg-surface-secondary">
                    <th className="px-6 py-4 font-semibold text-text-primary">Grade / Class</th>
                    <th className="px-6 py-4 font-semibold text-text-primary">Age Requirement</th>
                    <th className="px-6 py-4 font-semibold text-text-primary">Documents Required</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibility.map((row, idx) => (
                    <tr
                      key={row.grade}
                      className={idx % 2 === 0 ? "" : "bg-surface-secondary/50"}
                    >
                      <td className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                        {row.grade}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{row.age}</td>
                      <td className="px-6 py-4 text-text-secondary">{row.requirements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Important Dates"
              subtitle="Key dates for the current admission cycle"
            />
          </ScrollReveal>
          <div className="mx-auto max-w-2xl space-y-4">
            {importantDates.map((item, idx) => (
              <ScrollReveal key={item.event} delay={idx * 0.08}>
                <div className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-primary px-6 py-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📅</span>
                    <span className="font-medium text-text-primary">{item.event}</span>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1 text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {item.date}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Scholarships"
              subtitle="Recognizing and rewarding excellence"
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-4xl">
            {[
              {
                title: "Academic Merit",
                desc: "Up to 50% fee waiver for students securing top ranks in annual examinations.",
                icon: "🏆",
              },
              {
                title: "Sports Excellence",
                desc: "Special concessions for students representing at district, state, or national level.",
                icon: "⚽",
              },
              {
                title: "Need-Based Aid",
                desc: "Financial assistance for deserving students from economically weaker sections.",
                icon: "💛",
              },
            ].map((s, idx) => (
              <ScrollReveal key={s.title} delay={idx * 0.1}>
                <div className="rounded-xl bg-surface-primary p-6 text-center shadow-sm border border-border-primary">
                  <span className="text-4xl">{s.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Admission FAQs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Admission FAQs"
              subtitle="Quick answers to common admission questions"
            />
          </ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <FAQAccordion
                faqs={admissionFAQs}
              />
            </ScrollReveal>
            <div className="mt-6 text-center">
              <a
                href="/faq"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 underline"
              >
                See All FAQs →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Admission Enquiry"
              subtitle="Have questions? Fill out the form and we'll get back to you"
            />
          </ScrollReveal>
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready to Join Us?"
        subtitle="Visit our campus or call us to learn more about the admission process."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
