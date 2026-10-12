import "server-only";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** Null until STRIPE_SECRET_KEY is set; callers fall back to the enquiry flow. */
export const stripe = key ? new Stripe(key) : null;

export type CheckoutKind = "plate" | "request";
