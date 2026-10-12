"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getPlate } from "@/lib/data";
import { attachSession, releasePlate, reservePlate } from "@/lib/inventory";
import { stripe } from "@/lib/stripe";
import { absoluteUrl, site } from "@/lib/site";

const CHECKOUT_MINUTES = 30; // Stripe's minimum session length

/**
 * Buy Now: holds the plate and sends the buyer to Stripe Checkout. Without Stripe keys it
 * falls back to the contact form with the plate filled in, so no sale is lost.
 */
export async function startCheckout(slug: string): Promise<{ message: string }> {
  const plate = await getPlate(slug);
  if (!plate || plate.status === "sold" || plate.price === undefined) {
    return { message: "Sorry, this plate has just been sold." };
  }
  if (!stripe) redirect(`/contact?plate=${encodeURIComponent(plate.registration)}`);

  const expiresAt = new Date(Date.now() + CHECKOUT_MINUTES * 60_000);
  const token = randomUUID();
  if (!(await reservePlate(slug, expiresAt, token))) {
    return {
      message: "Someone is checking out this plate right now. If they don't complete, it frees up within 30 minutes.",
    };
  }

  let url: string;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(plate.price * 100),
            product_data: {
              name: `${plate.registration} private registration`,
              description: `Supplied on a DVLA V750 Certificate of Entitlement, ${site.certificateLeadTime}.`,
            },
          },
        },
      ],
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      custom_fields: [
        {
          key: "v750name",
          label: { type: "custom", custom: "Name for the V750 (if not yours)" },
          type: "text",
          optional: true,
        },
      ],
      custom_text: {
        submit: {
          message:
            "Registrations are personalised goods, so this payment is non-refundable. We'll apply for the V750 certificate using the details above.",
        },
      },
      metadata: { kind: "plate", slug: plate.slug, registration: plate.registration },
      payment_intent_data: { metadata: { kind: "plate", slug: plate.slug }, description: plate.registration },
      expires_at: Math.floor(expiresAt.getTime() / 1000),
      success_url: absoluteUrl("/checkout/success?session_id={CHECKOUT_SESSION_ID}"),
      cancel_url: absoluteUrl(`/checkout/cancel?plate=${plate.slug}&token=${token}`),
    });
    await attachSession(plate.slug, token, session.id);
    url = session.url!;
  } catch (err) {
    console.error("Checkout failed", err);
    await releasePlate(plate.slug, token);
    return { message: `Checkout isn't available right now. Please call ${site.phone} and we'll sort it out.` };
  }

  redirect(url);
}
