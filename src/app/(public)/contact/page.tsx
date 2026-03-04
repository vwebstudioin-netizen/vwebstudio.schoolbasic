import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { GoogleMap } from "@/components/public/GoogleMap";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";

export const metadata = genMeta({
  title: "Contact Us",
  description: "Get in touch with us for admissions, queries, and general information.",
  canonical: "/contact",
});

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const address = process.env.NEXT_PUBLIC_SCHOOL_ADDRESS;

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      detail: address || "School Address",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      detail: phone || "+91 00000 00000",
      href: phone ? `tel:${phone}` : undefined,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      detail: email || "info@school.com",
      href: email ? `mailto:${email}` : undefined,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Office Hours",
      detail: "Mon - Fri: 8:00 AM - 4:00 PM\nSat: 8:00 AM - 12:00 PM",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Contact Us" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out with any questions or enquiries.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal variant="fadeInLeft">
                <SectionHeading title="Get in Touch" align="left" />
                <p className="text-text-secondary mb-6">
                  Have questions about admissions, academics, or anything else?
                  We&apos;re here to help.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950/30 text-primary-600">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-text-secondary hover:text-primary-600 transition-colors"
                          >
                            {item.detail}
                          </a>
                        ) : (
                          <p className="text-sm text-text-secondary whitespace-pre-line">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <ScrollReveal variant="fadeInRight">
                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl font-semibold text-text-primary mb-6">
                      Send us a Message
                    </h3>
                    <ContactForm />
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading title="Find Us" subtitle="Visit us at our campus" />
            <GoogleMap />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
