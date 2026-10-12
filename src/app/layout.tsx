import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/toaster";
import { MotionProvider } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted and preloaded: no third-party font request and no layout shift.
const inter = localFont({
  src: "../fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const plateFace = localFont({
  src: "../fonts/plate.woff2",
  variable: "--font-plate-face",
  weight: "600",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Private Number Plates for Sale UK | Aqib Plates",
    template: "%s | Aqib Plates",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${plateFace.variable}`}>
      <body className="flex min-h-dvh flex-col bg-canvas font-sans text-fg">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}
