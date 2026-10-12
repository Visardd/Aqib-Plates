import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import seed from "@/data/seed-plates.json";
import { isForSale, slugify, type Plate } from "./plates";

const PLATES_QUERY = defineQuery(`*[_type == "plate" && defined(slug.current)] | order(featured desc, price desc) {
  registration,
  "slug": slug.current,
  price,
  status,
  note,
  featured,
  soldAt,
  "updatedAt": _updatedAt
}`);

/** Every plate, cached and tagged so a Sanity webhook can refresh it (see /api/revalidate). */
export async function getPlates(): Promise<Plate[]> {
  "use cache";
  cacheTag("plates");
  cacheLife("hours");

  if (!isSanityConfigured) {
    return (seed as Omit<Plate, "slug">[]).map((p) => ({ ...p, slug: (p as Plate).slug ?? slugify(p.registration) }));
  }

  const rows = await client.fetch<(Plate & { price: number | null; note: string | null })[]>(PLATES_QUERY);
  return rows.map((row) => ({
    ...row,
    price: row.price ?? undefined,
    note: row.note ?? undefined,
    soldAt: row.soldAt ?? undefined,
  }));
}

export async function getPlate(slug: string) {
  return (await getPlates()).find((p) => p.slug === slug);
}

export async function getPlatesForSale() {
  return (await getPlates()).filter(isForSale);
}

export async function getSoldPlates() {
  return (await getPlates())
    .filter((p) => p.status === "sold")
    .sort((a, b) => (b.soldAt ?? "").localeCompare(a.soldAt ?? ""));
}

export async function getFeaturedPlates() {
  const forSale = await getPlatesForSale();
  const featured = forSale.filter((p) => p.featured);
  return (featured.length >= 3 ? featured : forSale).slice(0, 6);
}
