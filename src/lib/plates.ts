// Plate types and pure helpers. Safe to import from client components.
// Data loading lives in `data.ts` (Sanity when configured, the seed file otherwise).

export type PlateStatus = "available" | "reserved" | "sold";

export type Plate = {
  registration: string;
  slug: string;
  price?: number;
  status: PlateStatus;
  note?: string;
  featured?: boolean;
  soldAt?: string;
  updatedAt?: string;
};

export function slugify(registration: string) {
  return registration.toLowerCase().trim().replace(/\s+/g, "-");
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return gbp.format(price);
}

// Reserved plates are mid-checkout and may come back, so they stay listed.
export const isForSale = (p: Plate) => p.status !== "sold";

// Numbers that stand in for letters on cherished plates, so "STOP" finds "DO I 5TOP".
const lookalikes: Record<string, string> = {
  "0": "O",
  "1": "I",
  "2": "Z",
  "3": "E",
  "4": "A",
  "5": "S",
  "6": "G",
  "7": "T",
  "8": "B",
};

const compact = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const reading = (s: string) => compact(s).replace(/[0-8]/g, (c) => lookalikes[c]);

export function matchesSearch(plate: Plate, query: string) {
  const q = compact(query);
  if (!q) return true;
  return compact(plate.registration).includes(q) || reading(plate.registration).includes(reading(q));
}

/** Other plates for sale closest in price, for "You may also like". */
export function similarPlates(plate: Plate, all: Plate[], count = 3) {
  const target = plate.price ?? 600;
  return all
    .filter((p) => p.slug !== plate.slug && isForSale(p))
    .sort((a, b) => Math.abs((a.price ?? target) - target) - Math.abs((b.price ?? target) - target))
    .slice(0, count);
}
