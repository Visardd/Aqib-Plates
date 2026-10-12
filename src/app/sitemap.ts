import type { MetadataRoute } from "next";
import { nav, absoluteUrl } from "@/lib/site";
import { getPlates } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const plates = await getPlates();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    ...nav.map((item) => ({
      url: absoluteUrl(item.href),
      changeFrequency: item.href === "/plates" ? ("daily" as const) : ("monthly" as const),
      priority: item.href === "/plates" ? 0.9 : 0.6,
    })),
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
