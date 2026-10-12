import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} about a private number plate. Call ${site.phone}, email ${site.email} or send us a message.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const details = [
  { label: "Call us", value: site.phone, href: site.phoneHref },
  { label: "Email us", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Address",
    value: `${site.address.street}, ${site.address.locality} ${site.address.postalCode}, ${site.address.countryName}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Talk to a real person"
        description="Questions about a plate, spacing, or the DVLA process? Send a message or give us a call."
      />
      <section className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <address className="flex flex-col gap-4 not-italic">
          {details.map((d) => (
            <div key={d.label} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-[13px] text-fg-muted">{d.label}</p>
              {d.href ? (
                <a href={d.href} className="mt-1 block text-[17px] font-medium tracking-tight transition-colors hover:text-accent">
                  {d.value}
                </a>
              ) : (
                <p className="mt-1 text-[17px] font-medium tracking-tight">{d.value}</p>
              )}
            </div>
          ))}
        </address>
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-medium tracking-tight">Send us a message</h2>
          <div className="mt-6">
            <Suspense fallback={<div className="h-[420px]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
