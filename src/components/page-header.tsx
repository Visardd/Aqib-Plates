import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function PageHeader({ label, title, description, children }: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-48 h-[480px] bg-[radial-gradient(45%_50%_at_50%_50%,rgb(253_208_0/0.08),transparent_70%)]"
      />
      <div className="container-page relative pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-[13px] font-medium text-accent">{label}</p>
          <h1 className="mt-3 max-w-3xl text-display text-gradient">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-fg-muted md:text-lg">{description}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
