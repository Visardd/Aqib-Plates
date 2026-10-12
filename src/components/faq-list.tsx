import { cn } from "@/lib/cn";

export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
            <h3>{item.q}</h3>
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-transform duration-200 ease-out group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 pr-10 text-[15px] leading-relaxed text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
