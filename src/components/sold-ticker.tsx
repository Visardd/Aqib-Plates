import { Plate } from "./plate";
import type { Plate as PlateData } from "@/lib/plates";

/** Slow marquee of recently sold plates. The list is duplicated so the loop is seamless. */
export function SoldTicker({ plates }: { plates: PlateData[] }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul className="flex w-max animate-marquee gap-4 pt-3 group-hover:[animation-play-state:paused]">
        {[...plates, ...plates].map((plate, i) => (
          <li key={`${plate.registration}-${i}`} aria-hidden={i >= plates.length} className="relative w-56 shrink-0">
            <Plate registration={plate.registration} variant={i % 2 ? "front" : "rear"} band={false} />
            <span className="absolute -top-2 right-2 rounded-full border border-line-strong bg-surface-2 px-2 py-0.5 text-[11px] font-medium tracking-wide text-fg-muted uppercase">
              Sold
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
