"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Honeypot, TextArea, TextField } from "./form-field";
import { sendContactMessage, type FormState } from "@/app/actions/forms";

export function ContactForm() {
  const plate = useSearchParams().get("plate")?.slice(0, 20) ?? "";
  const [state, action, pending] = useActionState<FormState, FormData>(sendContactMessage, { status: "idle" });
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Message sent", { description: state.message });
      form.current?.reset();
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={form} action={action} noValidate className="relative flex flex-col gap-5">
      <Honeypot />
      {plate && <input type="hidden" name="plate" value={plate} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" name="firstName" autoComplete="given-name" required error={state.errors?.firstName} />
        <TextField label="Last name" name="lastName" autoComplete="family-name" error={state.errors?.lastName} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" autoComplete="email" required error={state.errors?.email} />
        <TextField label="Phone (optional)" name="phone" type="tel" autoComplete="tel" error={state.errors?.phone} />
      </div>
      <TextArea
        label="Message"
        name="message"
        required
        error={state.errors?.message}
        defaultValue={plate ? `Hi, I'd like to buy ${plate}. ` : undefined}
      />
      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Send message"}
      </Button>
      <p className="text-[13px] text-fg-subtle">
        We only use your details to reply to you. See our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-fg-muted">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
