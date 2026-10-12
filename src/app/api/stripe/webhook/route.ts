import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { notifyOwner, sendEmail } from "@/lib/email";
import { markPlateSold, releasePlate } from "@/lib/inventory";
import { stripe } from "@/lib/stripe";
import { site } from "@/lib/site";

// Stripe calls this after checkout. It's the source of truth for a sale, not the success page.
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ message: "Stripe is not configured" }, { status: 500 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      if (event.data.object.payment_status === "paid") await fulfil(event.data.object);
      break;
    case "checkout.session.expired":
      if (event.data.object.metadata?.kind === "plate") {
        await releasePlate(event.data.object.metadata.slug);
        revalidateTag("plates", "max");
      }
      break;
  }

  return NextResponse.json({ received: true });
}

async function fulfil(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {};
  const customer = session.customer_details;
  const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
  const address = customer?.address;
  const addressLines = [address?.line1, address?.line2, address?.city, address?.postal_code, address?.country]
    .filter(Boolean)
    .join(", ");

  if (meta.kind === "plate") {
    const firstTime = await markPlateSold(meta.slug, new Date(session.created * 1000));
    revalidateTag("plates", { expire: 0 });
    if (!firstTime) return;

    const v750Name = session.custom_fields?.find((f) => f.key === "v750name")?.text?.value;
    await notifyOwner({
      subject: `Sold: ${meta.registration} for £${amount}`,
      replyTo: customer?.email ?? undefined,
      text: [
        `${meta.registration} has been paid for. Apply for the V750 using these details:`,
        "",
        `Name: ${v750Name || customer?.name || ""}`,
        v750Name ? `(Paid by ${customer?.name})` : undefined,
        `Address: ${addressLines}`,
        `Email: ${customer?.email ?? ""}`,
        `Phone: ${customer?.phone ?? ""}`,
        `Amount: £${amount}`,
        `Stripe payment: ${session.payment_intent}`,
      ]
        .filter((l) => l !== undefined)
        .join("\n"),
    });
    if (customer?.email) {
      await sendEmail({
        to: customer.email,
        replyTo: site.email,
        subject: `${meta.registration} is yours`,
        text: [
          `Hi ${customer.name?.split(" ")[0] ?? "there"},`,
          "",
          `Thanks for buying ${meta.registration}. We're applying to the DVLA for your V750 Certificate of Entitlement now. It should arrive ${site.certificateLeadTime}.`,
          "",
          "Once it arrives you can assign the registration to any eligible vehicle online at gov.uk, or keep it on the certificate until you're ready.",
          "",
          `Any questions, reply to this email or call ${site.phone}.`,
          "",
          site.name,
        ].join("\n"),
      });
    }
  }

  if (meta.kind === "request") {
    await notifyOwner({
      subject: `Paid plate request from ${meta.firstName}`,
      replyTo: customer?.email ?? undefined,
      text: [
        `Name: ${meta.firstName}`,
        `Email: ${customer?.email ?? ""}`,
        `Phone: ${meta.phone}`,
        `Budget: ${meta.budget}`,
        `Paid: £${amount} (refund via Stripe if no match: ${session.payment_intent})`,
        "",
        "Wants:",
        meta.idea,
      ].join("\n"),
    });
    if (customer?.email) {
      await sendEmail({
        to: customer.email,
        replyTo: site.email,
        subject: "We're searching for your plate",
        text: [
          `Hi ${meta.firstName},`,
          "",
          "Thanks for your plate request. We've started searching the DVLA database and will be in touch with options soon.",
          "If we can't find a plate that fits, we'll refund your £9.99 in full.",
          "",
          site.name,
        ].join("\n"),
      });
    }
  }
}
