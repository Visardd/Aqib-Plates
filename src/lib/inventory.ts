import "server-only";
import { writeClient } from "@/sanity/write-client";

type Doc = { _id: string; _rev: string; status: string; reservedUntil?: string; reservation?: { token: string; sessionId?: string } };

const findPlate = (slug: string) =>
  writeClient!.fetch<Doc | null>(`*[_type == "plate" && slug.current == $slug][0]{_id, _rev, status, reservedUntil, reservation}`, {
    slug,
  });

/**
 * Holds a plate for the length of a checkout so two people can't pay for it at once.
 * Returns false if it's sold or someone else is mid-checkout. Without Sanity it always allows.
 */
export async function reservePlate(slug: string, until: Date, token: string) {
  if (!writeClient) return true;
  const doc = await findPlate(slug);
  if (!doc) return false;
  const lapsed = doc.status === "reserved" && (!doc.reservedUntil || new Date(doc.reservedUntil) < new Date());
  if (doc.status !== "available" && !lapsed) return false;

  try {
    // ifRevisionId makes this fail if someone else changed the plate since we read it.
    await writeClient
      .patch(doc._id)
      .ifRevisionId(doc._rev)
      .set({ status: "reserved", reservedUntil: until.toISOString(), reservation: { token } })
      .commit();
    return true;
  } catch {
    return false;
  }
}

/** Remembers which Stripe session holds the reservation, so a cancel can close it. */
export async function attachSession(slug: string, token: string, sessionId: string) {
  if (!writeClient) return;
  const doc = await findPlate(slug);
  if (doc?.reservation?.token === token) await writeClient.patch(doc._id).set({ "reservation.sessionId": sessionId }).commit();
}

/** Frees a reserved plate. With a token, only the buyer holding that reservation can free it. */
export async function releasePlate(slug: string, token?: string) {
  if (!writeClient) return null;
  const doc = await findPlate(slug);
  if (doc?.status !== "reserved") return null;
  if (token !== undefined && doc.reservation?.token !== token) return null;
  await writeClient.patch(doc._id).set({ status: "available" }).unset(["reservedUntil", "reservation"]).commit();
  return doc.reservation?.sessionId ?? null;
}

/** Returns false if the plate was already marked sold, e.g. when Stripe retries a webhook. */
export async function markPlateSold(slug: string, soldAt: Date) {
  if (!writeClient) return true;
  const doc = await findPlate(slug);
  if (!doc) return true; // Still a sale the owner must hear about, even if the plate was deleted.
  if (doc.status === "sold") return false;
  await writeClient
    .patch(doc._id)
    .set({ status: "sold", soldAt: soldAt.toISOString().slice(0, 10), featured: false })
    .unset(["reservedUntil", "reservation"])
    .commit();
  return true;
}
