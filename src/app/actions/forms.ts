"use server";

import { z } from "zod";
import { notifyOwner } from "@/lib/email";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const name = z.string().trim().min(1, "Please enter your name").max(80);
const email = z.string().trim().max(200).pipe(z.email("Please enter a valid email address"));
const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number");

const contactSchema = z.object({
  firstName: name,
  lastName: z.string().trim().max(80).optional(),
  email,
  phone: phone.optional(),
  plate: z.string().trim().max(20).optional(),
  message: z.string().trim().min(5, "Please add a short message").max(3000),
});

const requestSchema = z.object({
  firstName: name,
  email,
  phone: phone.min(6, "Please enter a phone number"),
  budget: z.string().trim().min(1, "Please choose a budget").max(40),
  idea: z.string().trim().min(2, "Tell us what you'd like on your plate").max(1000),
});

function read(formData: FormData) {
  return Object.fromEntries([...formData.entries()].filter(([, v]) => typeof v === "string"));
}

// Bots fill every field; people never see this one.
const isBot = (formData: FormData) => Boolean(formData.get("company"));

export async function sendContactMessage(_: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  const parsed = contactSchema.safeParse(read(formData));
  if (!parsed.success) return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };

  const d = parsed.data;
  const sent = await notifyOwner({
    subject: d.plate ? `Enquiry about ${d.plate}` : `New message from ${d.firstName}`,
    replyTo: d.email,
    text: [
      `Name: ${d.firstName} ${d.lastName ?? ""}`.trim(),
      `Email: ${d.email}`,
      d.phone ? `Phone: ${d.phone}` : undefined,
      d.plate ? `Plate: ${d.plate}` : undefined,
      "",
      d.message,
    ]
      .filter((l) => l !== undefined)
      .join("\n"),
  });

  return sent.ok
    ? { status: "success", message: "Thanks! We'll get back to you shortly." }
    : { status: "error", message: "Something went wrong sending your message. Please call or email us instead." };
}

export async function submitPlateRequest(_: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  const parsed = requestSchema.safeParse(read(formData));
  if (!parsed.success) return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };

  // Step 4 puts Stripe Checkout (£9.99) in front of this; the email then goes out on payment.
  const d = parsed.data;
  const sent = await notifyOwner({
    subject: `Plate request from ${d.firstName}`,
    replyTo: d.email,
    text: [`Name: ${d.firstName}`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Budget: ${d.budget}`, "", "Wants:", d.idea].join(
      "\n",
    ),
  });

  return sent.ok
    ? { status: "success", message: "Request received. We'll start searching and be in touch soon." }
    : { status: "error", message: "Something went wrong sending your request. Please call or email us instead." };
}
