import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted and preloaded: no third-party font request and no layout shift.
const inter = localFont({
  src: "../fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// UKNumberPlate, a Charles Wright lookalike. The overrides make the line box symmetric around
// the capitals (cap height 1400 of 2048 units, so 324 units above and below), which centres
// registrations exactly. next/font needs literal values here.
const plateFace = localFont({
  src: "../fonts/uk-number-plate.woff2",
  variable: "--font-plate-face",
  weight: "400",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
  declarations: [
    { prop: "ascent-override", value: "84.1797%" },
    { prop: "descent-override", value: "15.8203%" },
    { prop: "line-gap-override", value: "0%" },
  ],
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
