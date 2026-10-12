import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { HeroPlate } from "@/components/hero-plate";
import { PlateCard } from "@/components/plate-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SoldTicker } from "@/components/sold-ticker";
import { availablePlates, featuredPlates, soldPlates } from "@/lib/plates";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "Choose your plate",
    body: "Browse hand-picked registrations, or ask us to find one for you. Every price is the final price, with no hidden fees.",
  },
  {
    title: "Pay securely online",
    body: "Check out in a minute with card, Apple Pay or Google Pay. You don't need a vehicle or a driving licence to buy.",
  },
  {
    title: "We handle the DVLA",
    body: `We apply for a V750 Certificate of Entitlement in your name. It arrives ${site.certificateLeadTime}, ready to assign to any eligible vehicle.`,
  },
];

const faqs = [
  {
    q: "Do you supply the physical number plates?",
    a: "No. We sell the registration itself. Once it's on your vehicle, any registered number plate supplier can make the physical plates.",
  },
  {
    q: "How long does the transfer take?",
    a: `Usually ${site.certificateLeadTime} for your V750 certificate to arrive, depending on DVLA processing and Royal Mail.`,
  },
  {
    q: "Do I need a car to buy a private plate?",
    a: "No. The registration is held on your V750 certificate until you're ready to put it on a vehicle.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[640px] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(253_208_0/0.10),transparent_70%)]"
        />
        <div className="container-page relative flex flex-col items-center pt-20 pb-24 text-center md:pt-28">
          <Reveal>
            <Link
              href="/plate-request"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <span className="hidden rounded-full bg-accent/15 px-1.5 py-px text-[11px] font-semibold text-accent sm:inline">
                Plate request
              </span>
              We&apos;ll find your perfect plate for £9.99
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 max-w-3xl text-display text-gradient">
              Private number plates, without the paperwork
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-muted md:text-lg">
              Hand-picked UK registrations at a fixed, final price. Buy online and we&apos;ll register it with
              the DVLA in your name.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/plates" size="lg">
              Browse {availablePlates.length} plates
            </ButtonLink>
            <ButtonLink href="/plate-request" variant="secondary" size="lg">
              Request a plate
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.25} y={24} className="mt-16 w-full max-w-2xl">
            <HeroPlate registrations={featuredPlates.map((p) => p.registration)} />
          </Reveal>
        </div>
      </section>

      {/* Available plates */}
      <section aria-labelledby="available-title" className="container-page py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="available-title"
            index="01"
            label="Available now"
            title="Registrations for sale"
            description="Each plate is one of a kind. When it's gone, it's gone."
          />
          <ButtonLink href="/plates" variant="secondary" className="self-start md:self-auto">
            View all plates
          </ButtonLink>
        </div>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPlates.map((plate) => (
            <StaggerItem key={plate.slug}>
              <PlateCard plate={plate} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="container-page py-24">
        <SectionHeading
          id="how-title"
          index="02"
          label="How it works"
          title="From checkout to certificate"
          description="Buying a cherished registration should be simple. Here's everything that happens after you choose."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-canvas p-8">
              <Reveal delay={i * 0.06}>
                <span className="font-mono text-[13px] text-fg-subtle">Step {i + 1}</span>
                <h3 className="mt-6 text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Recently sold */}
      <section aria-labelledby="sold-title" className="py-24">
        <div className="container-page flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="sold-title"
            index="03"
            label="Recently sold"
            title="Plates now on the road"
          />
          <Link href="/sold" className="text-sm text-fg-muted transition-colors hover:text-fg">
            See all sold plates →
          </Link>
        </div>
        <div className="mt-12">
          <SoldTicker plates={soldPlates.slice(0, 14)} />
        </div>
      </section>

      {/* Plate request CTA */}
      <section aria-labelledby="request-title" className="container-page py-24">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 md:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -bottom-40 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(253_208_0/0.14),transparent)]"
          />
          <div className="relative max-w-xl">
            <p className="text-[13px] font-medium text-accent">Plate finding service</p>
            <h2 id="request-title" className="mt-3 text-title text-gradient">
              Can&apos;t see the one? We&apos;ll find it.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-fg-muted">
              Tell us your budget and what you&apos;d like on your plate. We&apos;ll personally search the DVLA
              database for a match. If we can&apos;t find one, you get a full refund.
            </p>
            <ButtonLink href="/plate-request" size="lg" className="mt-8">
              Request a plate for £9.99
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* FAQ teaser */}
      <section aria-labelledby="faq-title" className="container-page grid gap-12 py-24 md:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          id="faq-title"
          label="Questions"
          title="Good to know"
          description={
            <>
              More answers on the{" "}
              <Link href="/faq" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                FAQ page
              </Link>
              .
            </>
          }
        />
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
                {item.q}
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-transform duration-200 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-10 text-[15px] leading-relaxed text-fg-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
