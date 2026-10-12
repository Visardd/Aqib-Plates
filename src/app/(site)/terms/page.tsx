import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: terms.title,
  description: terms.description,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function TermsPage() {
  return <LegalDocument doc={terms} path="/terms" />;
}
