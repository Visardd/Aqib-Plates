import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button";
import { BuyButton } from "@/components/buy-button";
import { ShareButton } from "@/components/copy-button";
import { JsonLd } from "@/components/json-ld";
import { Plate } from "@/components/plate";
import { PlateCard } from "@/components/plate-card";
import { Reveal } from "@/components/reveal";
import { getPlate, getPlates } from "@/lib/data";
import { plateSpacing } from "@/lib/plate-font";
import { formatPrice, similarPlates } from "@/lib/plates";
import { plateImageUrl, plateProductSchema } from "@/lib/structured-data";
import { absoluteUrl, site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getPlates()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/plates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const plate = await getPlate(slug);
  if (!plate) return {};

  const sold = plate.status === "sold";
  const price = plate.price !== undefined ? ` for ${formatPrice(plate.price)}` : "";
  return {
    title: sold ? `${plate.registration} Private Plate (Sold)` : `${plate.registration} Private Number Plate${price}`,
    description: sold
      ? `${plate.registration} has been sold. Browse similar private number plates for sale, or let us find one for you.`
      : `Buy the ${plate.registration} private registration${price}. Fixed, final price with the DVLA V750 certificate in your name ${site.certificateLeadTime}.`,
    alternates: { canonical: `/plates/${plate.slug}` },
    openGraph: {
      url: `/plates/${plate.slug}`,
      type: "website",
      images: [{ url: plateImageUrl(plate.slug), width: 1200, height: 630, alt: `${plate.registration} number plate` }],
    },
    twitter: { card: "summary_large_image", images: [plateImageUrl(plate.slug)] },
  };
}

const assurances = [
  "Fixed, final price with no hidden fees",
  `DVLA V750 certificate in your name, ${site.certificateLeadTime}`,
  "No vehicle or driving licence needed to buy",
  "We sell the registration, not physical plates",
];

export default async function PlatePage({ params }: PageProps<"/plates/[slug]">) {
  const { slug } = await params;
  const [plate, all] = await Promise.all([getPlate(slug), getPlates()]);
  if (!plate) notFound();

  const sold = plate.status === "sold";
  const reserved = plate.status === "reserved";
  const similar = similarPlates(plate, all);

  return (
    <>
      <JsonLd data={plateProductSchema(plate)} />
      <div className="container-page pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: sold ? "Sold" : "Private plates", path: sold ? "/sold" : "/plates" },
            { name: plate.registration, path: `/plates/${plate.slug}` },
          ]}
        />
      </div>

      <section className="container-page grid gap-12 pt-10 pb-24 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal className="relative flex flex-col gap-5 self-start rounded-3xl border border-line bg-surface p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_30%,rgb(253_208_0/0.08),transparent_70%)]"
          />
          <Plate registration={plate.registration} variant="front" className="relative" />
          <Plate registration={plate.registration} className="relative" />
          <p className="relative text-center text-[13px] text-fg-subtle">
            Preview only. Physical plates must use DVLA-approved spacing.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col">
          <p className="text-[13px] font-medium text-accent">
            {sold ? "Sold" : reserved ? "Reserved" : "Private number plate"}
          </p>
          <h1
            className="mt-3 font-plate text-6xl leading-none whitespace-pre"
            style={{ letterSpacing: `${plateSpacing.letterSpacing}em`, wordSpacing: `${plateSpacing.wordSpacing}em` }}
          >
            {plate.registration}
          </h1>
          {plate.price !== undefined && !sold && (
            <p className="mt-6 text-3xl font-medium tracking-tight tabular-nums">{formatPrice(plate.price)}</p>
          )}
          {plate.note && (
            <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg-muted">{plate.note}</p>
          )}

          {sold ? (
            <div className="mt-8">
              <p className="text-[15px] leading-relaxed text-fg-muted">
                This registration has found a new owner. We can search the DVLA for something similar, or browse what&apos;s
                available now.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/plate-request" size="lg">
                  Find me a similar plate
                </ButtonLink>
                <ButtonLink href="/plates" variant="secondary" size="lg">
                  Browse plates
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex gap-3">
              <BuyButton slug={plate.slug} reserved={reserved} />
              <ShareButton title={`${plate.registration} private number plate`} url={absoluteUrl(`/plates/${plate.slug}`)} />
            </div>
          )}

          <ul className="mt-10 flex flex-col gap-3 border-t border-line pt-8">
            {assurances.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-fg-muted">
                <svg aria-hidden viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" fill="none">
                  <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-fg-muted">
            Questions about this plate?{" "}
            <Link href={`/contact?plate=${encodeURIComponent(plate.registration)}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
              Ask us
            </Link>{" "}
            or call{" "}
            <a href={site.phoneHref} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
              {site.phone}
            </a>
            .
          </p>
        </Reveal>
      </section>

      {similar.length > 0 && (
        <section aria-labelledby="similar-title" className="container-page py-12">
          <h2 id="similar-title" className="text-xl font-medium tracking-tight">
            You may also like
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PlateCard key={p.slug} plate={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
