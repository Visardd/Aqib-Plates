import Link from "next/link";
import type { Guide } from "@/content/guides";
import { cn } from "@/lib/cn";

export function GuideCard({ guide, className }: { guide: Guide; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-line bg-surface p-6",
        "transition-[border-color,background-color] duration-200 ease-out hover:border-line-strong hover:bg-surface-2",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <h3 className="text-[17px] font-medium tracking-tight">
        <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {guide.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-fg-muted">{guide.description}</p>
      <p aria-hidden className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-fg-muted transition-colors group-hover:text-fg">
        Read guide
        <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" fill="none">
          <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </article>
  );
}
