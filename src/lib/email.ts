import "server-only";
import { Resend } from "resend";
import { site } from "./site";

type Email = { subject: string; text: string; replyTo?: string };

/**
 * Sends a notification to the business inbox. Without RESEND_API_KEY (local dev and
 * previews) it logs instead, so forms still work end to end.
 */
export async function notifyOwner({ subject, text, replyTo }: Email) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[email not sent: RESEND_API_KEY missing]\n${subject}\n${text}`);
    return { ok: true as const };
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
    to: process.env.OWNER_EMAIL ?? site.email,
    subject,
    text,
    replyTo,
  });
  if (error) {
    console.error("Email failed", error);
    return { ok: false as const };
  }
  return { ok: true as const };
}
