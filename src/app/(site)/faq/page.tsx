import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { faqs } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Number Plate FAQ",
  description:
    "How buying a private number plate works: the DVLA V750 certificate, how long it takes, whether you need a car, and what the price includes.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHeader
        label="FAQ"
        title="Questions, answered"
        description="Everything you need to know about buying a cherished registration and the DVLA paperwork."
      />
      <section className="container-page grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <FaqList items={faqs} />
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-lg font-medium tracking-tight">Still have a question?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
            Call us on{" "}
            <a href={site.phoneHref} className="text-fg">
              {site.phone}
            </a>{" "}
            or send a message and we&apos;ll get back to you.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-5">
            Contact us
          </ButtonLink>
        </aside>
      </section>
    </>
  );
}
