import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PlateBrowser } from "@/components/plate-browser";
import { JsonLd } from "@/components/json-ld";
import { getPlatesForSale } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Number Plates for Sale",
  description:
    "Browse cherished UK registrations for sale at fixed, final prices. Every plate comes with the DVLA V750 certificate handled for you.",
  alternates: { canonical: "/plates" },
  openGraph: { url: "/plates" },
};

export default async function PlatesPage() {
  const plates = await getPlatesForSale();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Private number plates for sale",
          numberOfItems: plates.length,
          itemListElement: plates.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/plates/${p.slug}`),
            name: p.registration,
          })),
        }}
      />
      <PageHeader
        label="Private plates"
        title="Private number plates for sale"
        description="Every registration is one of a kind, priced to include everything. Search by word or initials and we'll match numbers that read as letters too."
      />
      <section aria-label="Plates for sale" className="container-page">
        <PlateBrowser plates={plates} />
      </section>
    </>
  );
}
