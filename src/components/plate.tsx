import { cn } from "@/lib/cn";
import { plateBand, plateText } from "@/lib/plate-font";

type PlateProps = {
  registration: string;
  variant?: "rear" | "front";
  band?: boolean;
  className?: string;
  /** Render as a heading or plain text. The registration stays real text so search engines can read it. */
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

// Real UK plates are 520 × 111 mm with 79 mm characters. Sizes below are in container
// query units so the plate scales to whatever width it is given.
export function Plate({ registration, variant = "rear", band = true, className, as: Tag = "span" }: PlateProps) {
  const reg = plateText(registration, { width: 100, band });

  return (
    <div className={cn("@container w-full", className)}>
      <div
        className={cn(
          "relative flex aspect-[520/111] w-full overflow-hidden rounded-[2.4cqw] text-plate-ink",
          "shadow-[0_1px_0_rgb(255_255_255/0.35)_inset,0_10px_30px_-12px_rgb(0_0_0/0.8)]",
          variant === "rear" ? "bg-plate-yellow" : "bg-plate-white",
        )}
      >
        {band && (
          <span
            aria-hidden
            className="flex shrink-0 flex-col items-center justify-end bg-plate-band pb-[2.2cqw] font-sans text-[3.6cqw] leading-none font-bold tracking-wide text-white"
            style={{ width: `${plateBand * 100}cqw` }}
          >
            UK
          </span>
        )}
        <Tag
          className="m-0 flex flex-1 items-center justify-center font-plate leading-none font-normal whitespace-pre"
          style={{
            fontSize: `${reg.fontSize.toFixed(3)}cqw`,
            letterSpacing: `${reg.letterSpacing.toFixed(3)}cqw`,
            wordSpacing: `${reg.wordSpacing.toFixed(3)}cqw`,
            transform: `translateX(${reg.offset.toFixed(3)}cqw)`,
          }}
        >
          {reg.text}
        </Tag>
        {/* Inset border and a soft sheen, like the reflective acrylic face. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[0.9cqw] rounded-[1.8cqw] border-[0.3cqw] border-plate-ink/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgb(255_255_255/0.45)_0%,transparent_38%,transparent_70%,rgb(0_0_0/0.08)_100%)]"
        />
      </div>
    </div>
  );
}
