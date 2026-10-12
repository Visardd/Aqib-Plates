import type { MetadataRoute } from "next";
import { nav, absoluteUrl } from "@/lib/site";
import { plates } from "@/lib/plates";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    ...nav.map((item) => ({
      url: absoluteUrl(item.href),
      changeFrequency: item.href === "/plates" ? ("daily" as const) : ("monthly" as const),
      priority: item.href === "/plates" ? 0.9 : 0.6,
    })),
  ];

  // Only plates with their own page; sold ones stay listed so their links keep ranking.
  const platePages: MetadataRoute.Sitemap = plates
    .filter((p) => p.price !== undefined)
    .map((p) => ({
      url: absoluteUrl(`/plates/${p.slug}`),
      changeFrequency: "weekly",
      priority: p.status === "available" ? 0.8 : 0.3,
    }));

  return [...pages, ...platePages];
}
