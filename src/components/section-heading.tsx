import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small numbered label above a heading, after Linear's "Fig 0.1" sections. */
export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-2 text-[13px] font-medium text-fg-muted">
        {index && <span className="font-mono text-fg-subtle tabular-nums">{index}</span>}
        {label}
      </p>
      <h2 id={id} className="mt-3 text-title text-gradient">
        {title}
      </h2>
      {description && <p className="mt-4 text-[17px] leading-relaxed text-fg-muted">{description}</p>}
    </div>
  );
}
