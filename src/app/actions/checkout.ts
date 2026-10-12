"use server";

import { redirect } from "next/navigation";
import { getPlate } from "@/lib/data";

/**
 * Buy Now. Until online payments are switched on (step 4, Stripe), this sends the buyer
 * to the contact form with the plate filled in, so no sale is lost in the meantime.
 */
export async function startCheckout(slug: string) {
  const plate = await getPlate(slug);
  if (!plate || plate.status !== "available") redirect(`/plates/${slug}`);

  redirect(`/contact?plate=${encodeURIComponent(plate.registration)}`);
}
