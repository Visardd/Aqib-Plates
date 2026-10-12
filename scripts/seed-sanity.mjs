// One-off import of the plates from the old Wix site into Sanity.
// Usage: SANITY_API_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... node scripts/seed-sanity.mjs
import { readFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-10-01",
  token,
  useCdn: false,
});

const plates = JSON.parse(await readFile(new URL("../src/data/seed-plates.json", import.meta.url), "utf8"));
const tx = client.transaction();
for (const p of plates) {
  const slug = p.slug ?? p.registration.toLowerCase().trim().replace(/\s+/g, "-");
  tx.createOrReplace({
    _id: `plate-${slug}`,
    _type: "plate",
    registration: p.registration,
    slug: { _type: "slug", current: slug },
    price: p.price,
    status: p.status,
    featured: Boolean(p.featured),
    note: p.note,
  });
}
await tx.commit();
console.log(`Imported ${plates.length} plates.`);
