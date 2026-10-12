import type { Metadata } from "next";
import { GuideCard } from "@/components/guide-card";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { guides } from "@/content/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Number Plate Guides",
  description:
    "Plain-English guides to buying a private number plate: how the V750 certificate works, how to put a plate on your car, and the UK display rules.",
  alternates: { canonical: "/guides" },
  openGraph: { url: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Private number plate guides",
          numberOfItems: guides.length,
          itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/guides/${g.slug}`),
            name: g.title,
          })),
        }}
      />
      <PageHeader
        label="Guides"
        title="Private plate guides"
        description="Straight answers to the questions buyers ask most, from the V750 certificate to the rules for displaying your plate."
      />
      <section aria-label="All guides" className="container-page">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <StaggerItem key={guide.slug} className="flex">
              <GuideCard guide={guide} className="flex-1" />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
