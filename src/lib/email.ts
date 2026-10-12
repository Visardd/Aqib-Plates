import "server-only";
import { Resend } from "resend";
import { site } from "./site";

type Email = { to: string; subject: string; text: string; replyTo?: string };

/**
 * Sends an email through Resend. Without RESEND_API_KEY (local dev and previews) it logs
 * instead, so forms and checkout still work end to end.
 */
export async function sendEmail({ to, subject, text, replyTo }: Email) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[email not sent: RESEND_API_KEY missing]\nTo: ${to}\n${subject}\n${text}`);
    return { ok: true as const };
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
    to,
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

export const ownerEmail = () => process.env.OWNER_EMAIL ?? site.email;

export function notifyOwner(email: Omit<Email, "to">) {
  return sendEmail({ ...email, to: ownerEmail() });
}
