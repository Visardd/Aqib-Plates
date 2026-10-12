import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { PlateRequestForm } from "@/components/plate-request-form";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Plate Finding Service, £9.99",
  description:
    "Can't find the right private number plate? For £9.99 we'll personally search the DVLA database for one that fits your style and budget, or refund you in full.",
  alternates: { canonical: "/plate-request" },
  openGraph: { url: "/plate-request" },
};

const how = [
  { title: "Tell us your idea", body: "Initials, a name, a word or a vehicle make, plus your budget." },
  { title: "We search the DVLA", body: "We personally search the DVLA database and private markets for matches." },
  { title: "Pick your favourite", body: "We send you the options. Buy the one you love, with the paperwork done for you." },
];

export default function PlateRequestPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Private plate finding service",
          serviceType: "Private number plate search",
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: { "@type": "Country", name: "United Kingdom" },
          offers: {
            "@type": "Offer",
            price: site.requestFee.toFixed(2),
            priceCurrency: "GBP",
            url: absoluteUrl("/plate-request"),
          },
        }}
      />
      <PageHeader
        label="Plate finding service"
        title="Struggling to find the perfect plate? We've got you."
        description="For £9.99 we'll personally search the DVLA database for a registration that matches your style, preferences and budget."
      />
      <section className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <PlateRequestForm />
        </div>
        <aside className="flex flex-col gap-8">
          <ol className="flex flex-col gap-6">
            {how.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line font-mono text-[12px] text-fg-muted">
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-[15px] font-medium">{step.title}</h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <h2 className="text-[15px] font-medium text-accent">Full refund guarantee</h2>
            <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">
              If we can&apos;t find a single plate that fits your requirements, you get your £9.99 back. No questions asked.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
