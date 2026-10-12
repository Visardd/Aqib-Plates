import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacy} path="/privacy" />;
}
