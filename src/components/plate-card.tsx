import Link from "next/link";
import { Plate } from "./plate";
import { PlateQuickView } from "./plate-quick-view";
import { formatPrice, type Plate as PlateData } from "@/lib/plates";
import { cn } from "@/lib/cn";

export function PlateCard({ plate, className }: { plate: PlateData; className?: string }) {
  const sold = plate.status === "sold";

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5",
        "transition-[border-color,background-color] duration-200 ease-out hover:border-line-strong hover:bg-surface-2",
        className,
      )}
    >
      {/* Glow that wakes up on hover, Linear-style. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <Plate registration={plate.registration} className={cn(sold && "opacity-60 grayscale-[0.4]")} />
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-medium tracking-tight">
            <Link href={`/plates/${plate.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
              {plate.registration}
              <span className="sr-only"> private number plate</span>
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-fg-muted tabular-nums">
            {sold ? "Sold" : plate.price !== undefined ? formatPrice(plate.price) : "Price on request"}
          </p>
        </div>
        <PlateQuickView plate={plate} />
      </div>
    </article>
  );
}
