"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Honeypot, TextArea, TextField } from "./form-field";
import { Plate } from "./plate";
import { submitPlateRequest, type FormState } from "@/app/actions/forms";
import { cn } from "@/lib/cn";

const budgets = ["Under £500", "£500 to £1,000", "£1,000 to £2,500", "£2,500 to £5,000", "£5,000+"];
const steps = ["Your idea", "Budget", "Your details"] as const;
const ease = [0.23, 1, 0.32, 1] as const;

export function PlateRequestForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [state, action, pending] = useActionState<FormState, FormData>(async (prev, formData) => {
    const result = await submitPlateRequest(prev, formData);
    // Send the visitor back to whichever step the server rejected.
    const back = result.errors?.idea ? 0 : result.errors?.budget ? 1 : null;
    if (back !== null) {
      setDir(-1);
      setStep(back);
    }
    return result;
  }, { status: "idle" });
  const [values, setValues] = useState({ idea: "", budget: "", firstName: "", email: "", phone: "" });
  const [localError, setLocalError] = useState<string | null>(null);

  const set = (key: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [key]: v }));

  useEffect(() => {
    if (state.status === "success") toast.success("Request received", { description: state.message });
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  function next() {
    if (step === 0 && values.idea.trim().length < 2) return setLocalError("Tell us what you'd like on your plate");
    if (step === 1 && !values.budget) return setLocalError("Please choose a budget");
    setLocalError(null);
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setLocalError(null);
    setDir(-1);
    setStep((s) => s - 1);
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="flex flex-col items-center py-10 text-center"
      >
        <div className="w-full max-w-xs">
          <Plate registration="ON 1T" />
        </div>
        <h2 className="mt-8 text-2xl font-medium tracking-tight">We&apos;re on it, {values.firstName}</h2>
        <p className="mt-2 max-w-sm text-[15px] text-fg-muted">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className="relative">
      <Honeypot />
      {Object.entries(values).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}

      <ol className="mb-8 flex gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <span
              className={cn(
                "block h-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-accent" : "bg-white/10",
              )}
            />
            <span className={cn("mt-2 block text-[12px]", i === step ? "text-fg" : "text-fg-subtle")}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir * -24, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease }}
            className="flex flex-col gap-5"
          >
            {step === 0 && (
              <TextArea
                label="What would you like on your plate?"
                name="idea-input"
                value={values.idea}
                onChange={(e) => set("idea")(e.target.value)}
                placeholder="e.g. my initials JB, the name SARAH, or anything with 'BMW'"
                hint="Names, initials, words, numbers or a vehicle make. The more detail the better."
                error={localError && step === 0 ? [localError] : state.errors?.idea}
                autoFocus
              />
            )}

            {step === 1 && (
              <fieldset>
                <legend className="text-[13px] font-medium text-fg">What&apos;s your budget?</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={values.budget === b}
                      onClick={() => set("budget")(b)}
                      className={cn(
                        "h-12 rounded-xl border px-4 text-left text-[15px] transition-[border-color,background-color,transform] duration-150 active:scale-[0.98]",
                        values.budget === b
                          ? "border-accent/70 bg-accent/10 text-fg"
                          : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                {(localError || state.errors?.budget) && step === 1 && (
                  <p className="mt-2 text-[13px] text-red-300">{localError ?? state.errors?.budget?.[0]}</p>
                )}
              </fieldset>
            )}

            {step === 2 && (
              <>
                <TextField
                  label="First name"
                  name="firstName-input"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={(e) => set("firstName")(e.target.value)}
                  error={state.errors?.firstName}
                  autoFocus
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label="Email"
                    name="email-input"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    error={state.errors?.email}
                  />
                  <TextField
                    label="Phone"
                    name="phone-input"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    error={state.errors?.phone}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          // Distinct keys stop React reusing this button as the submit button mid-click.
          <Button key="next" type="button" size="lg" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button key="submit" type="submit" size="lg" disabled={pending}>
            {pending ? "Sending…" : "Check out £9.99"}
          </Button>
        )}
      </div>
      <p className="mt-6 text-[13px] text-fg-subtle">
        We only use your details to find your plate. See our{" "}
        <Link href="/terms#plate-finding-service" className="underline underline-offset-4 hover:text-fg-muted">
          Terms of Sale
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-fg-muted">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
