import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border border-line bg-surface px-4 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-colors hover:border-line-strong focus:border-accent/60 aria-[invalid=true]:border-red-400/60";

type FieldProps = { label: string; name: string; error?: string[]; hint?: ReactNode; className?: string };

function Wrapper({ label, name, error, hint, className, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-[13px] font-medium text-fg">
        {label}
      </label>
      {children}
      {error?.[0] ? (
        <p id={`${name}-error`} className="text-[13px] text-red-300">
          {error[0]}
        </p>
      ) : (
        hint && <p className="text-[13px] text-fg-subtle">{hint}</p>
      )}
    </div>
  );
}

export function TextField({ label, name, error, hint, className, ...props }: FieldProps & ComponentProps<"input">) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} className={className}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(control, "h-11")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextArea({ label, name, error, hint, className, ...props }: FieldProps & ComponentProps<"textarea">) {
  return (
    <Wrapper label={label} name={name} error={error} hint={hint} className={className}>
      <textarea
        id={name}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(control, "resize-y py-3 leading-relaxed")}
        {...props}
      />
    </Wrapper>
  );
}

/** Hidden from people, irresistible to bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
