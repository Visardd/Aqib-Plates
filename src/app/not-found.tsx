import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Plate } from "@/components/plate";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-32 text-center">
      <div className="w-full max-w-md">
        <Plate registration="404 OOPS" variant="front" />
      </div>
      <h1 className="mt-12 text-title text-gradient">This page has moved or sold</h1>
      <p className="mt-4 max-w-md text-fg-muted">
        The plate or page you were looking for isn&apos;t here any more. Have a look at what&apos;s available now.
      </p>
      <ButtonLink href="/plates" size="lg" className="mt-8">
        Browse plates
      </ButtonLink>
    </section>
  );
}
