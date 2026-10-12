import { NextResponse, type NextRequest } from "next/server";
import { releasePlate } from "@/lib/inventory";
import { stripe } from "@/lib/stripe";

// Stripe's "back" link: frees the plate straight away instead of holding it until the session times out.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("plate") ?? "";
  const token = req.nextUrl.searchParams.get("token") ?? "";
  if (!/^[a-z0-9-]{1,40}$/.test(slug)) return NextResponse.redirect(new URL("/plates", req.url));

  const sessionId = token ? await releasePlate(slug, token) : null;
  if (sessionId && stripe) await stripe.checkout.sessions.expire(sessionId).catch(() => undefined);

  return NextResponse.redirect(new URL(`/plates/${slug}`, req.url));
}
