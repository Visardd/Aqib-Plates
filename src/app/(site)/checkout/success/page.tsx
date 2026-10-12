import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Plate } from "@/components/plate";
import { stripe } from "@/lib/stripe";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

async function Receipt({ searchParams }: { searchParams: PageProps<"/checkout/success">["searchParams"] }) {
  const id = (await searchParams).session_id;
  const session =
    stripe && typeof id === "string" && id.startsWith("cs_")
      ? await stripe.checkout.sessions.retrieve(id).catch(() => null)
      : null;

  const kind = session?.metadata?.kind;
  const name = session?.customer_details?.name?.split(" ")[0] ?? session?.metadata?.firstName;
  const registration = session?.metadata?.registration;

  return (
    <>
      <div className="w-full max-w-md">
        <Plate registration={kind === "plate" && registration ? registration : "THANK U"} />
      </div>
      <h1 className="mt-12 text-title text-gradient">
        {kind === "plate" && registration ? `${registration} is yours${name ? `, ${name}` : ""}` : `Thank you${name ? `, ${name}` : ""}`}
      </h1>
      <p className="mt-4 max-w-md text-[17px] leading-relaxed text-fg-muted">
        {kind === "request"
          ? "Your £9.99 payment went through and we've started searching. We'll be in touch with options soon, and if we can't find a match you get a full refund."
          : `Your payment went through. We're applying to the DVLA for your V750 certificate, which should arrive ${site.certificateLeadTime}. A confirmation is on its way to your inbox.`}
      </p>
    </>
  );
}

export default function SuccessPage(props: PageProps<"/checkout/success">) {
  return (
    <section className="container-page flex flex-col items-center py-24 text-center">
      <Suspense fallback={<div className="h-72" />}>
        <Receipt searchParams={props.searchParams} />
      </Suspense>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/plates" size="lg">
          Browse more plates
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Contact us
        </ButtonLink>
      </div>
      <p className="mt-10 text-sm text-fg-subtle">
        Questions? Call {site.phone} or email {site.email}.
      </p>
    </section>
  );
}
