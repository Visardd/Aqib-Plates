import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { Plate } from "@/components/plate";
import { Stagger, StaggerItem } from "@/components/reveal";
import { getSoldPlates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recently Sold Private Plates",
  description:
    "Private number plates we've recently sold to customers across the UK. Looking for something similar? We'll search the DVLA for you.",
  alternates: { canonical: "/sold" },
  openGraph: { url: "/sold" },
};

export default async function SoldPage() {
  const plates = await getSoldPlates();

  return (
    <>
      <PageHeader
        label="Recently sold"
        title="Plates now on the road"
        description={`${plates.length} registrations have found new owners. Missed one you liked? We can find you something similar.`}
      >
        <ButtonLink href="/plate-request" size="lg" className="mt-8">
          Find me a similar plate
        </ButtonLink>
      </PageHeader>
      <section aria-label="Sold plates" className="container-page">
        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {plates.map((plate, i) => (
            <StaggerItem key={plate.slug}>
              <Link
                href={`/plates/${plate.slug}`}
                className="group relative block rounded-2xl border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-strong hover:bg-surface-2"
              >
                <Plate registration={plate.registration} variant={i % 2 ? "front" : "rear"} band={false} />
                <span className="mt-3 flex items-center justify-between text-[13px] text-fg-muted">
                  <span>{plate.soldAt ? new Date(plate.soldAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : ""}</span>
                  <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase">
                    Sold
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
