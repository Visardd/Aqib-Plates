import type { MetadataRoute } from "next";
import { nav, absoluteUrl } from "@/lib/site";
import { getPlates } from "@/lib/data";
import { guides } from "@/content/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const plates = await getPlates();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    ...nav.map((item) => ({
      url: absoluteUrl(item.href),
      changeFrequency: item.href === "/plates" ? ("daily" as const) : ("monthly" as const),
      priority: item.href === "/plates" ? 0.9 : 0.6,
    })),
    { url: absoluteUrl("/guides"), changeFrequency: "monthly", priority: 0.6 },
    ...guides.map((g) => ({
      url: absoluteUrl(`/guides/${g.slug}`),
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Sold plates stay listed so their pages keep ranking and pass visitors on to similar plates.
  const platePages: MetadataRoute.Sitemap = plates.map((p) => ({
    url: absoluteUrl(`/plates/${p.slug}`),
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: p.status === "available" ? 0.8 : 0.3,
  }));

  return [...pages, ...platePages];
}
