import { cn } from "@/lib/cn";

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
  const reg = registration.toUpperCase();
  const fontSize = Math.min(19.5, 150 / Math.max(reg.length, 7));

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
            className="flex w-[8.6cqw] shrink-0 flex-col items-center justify-end bg-plate-band pb-[2.2cqw] font-sans text-[3.6cqw] leading-none font-bold tracking-wide text-white"
          >
            UK
          </span>
        )}
        <Tag
          className="m-0 flex flex-1 items-center justify-center font-plate leading-none font-semibold whitespace-pre"
          style={{ fontSize: `${fontSize}cqw`, letterSpacing: "0.015em" }}
        >
          {reg}
        </Tag>
        {/* Inset border and a soft sheen, like the reflective acrylic face. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[1.3cqw] rounded-[1.6cqw] border-[0.35cqw] border-plate-ink/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgb(255_255_255/0.45)_0%,transparent_38%,transparent_70%,rgb(0_0_0/0.08)_100%)]"
        />
      </div>
    </div>
  );
}
