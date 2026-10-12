"use client";

import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

// Matches --ease-out-strong. Opening is a touch slower than closing so the answer settles in.
const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
const duration = { open: 380, close: 260 };

/**
 * A native <details>, so answers are in the HTML, work without JavaScript and open on
 * find-in-page. Clicks are taken over to animate the height and fade the answer in.
 */
function FaqItem({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const running = useRef<{ animations: Animation[]; opening: boolean } | null>(null);
  const [expanded, setExpanded] = useState(false);

  function toggle(event: MouseEvent) {
    const details = detailsRef.current;
    const answer = answerRef.current;
    if (!details || !answer || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();

    const opening = !expanded;
    setExpanded(opening);

    // Clicked again mid-animation: play it back from where it is.
    if (running.current) {
      running.current.opening = opening;
      running.current.animations.forEach((animation) => animation.reverse());
      return;
    }

    details.open = true;
    const summary = details.firstElementChild as HTMLElement;
    const openHeight = details.offsetHeight;
    const closedHeight = summary.offsetHeight + details.offsetHeight - details.clientHeight; // + border
    const timing = { duration: opening ? duration.open : duration.close, easing: ease, fill: "forwards" } as const;
    const shown = { opacity: 1, transform: "none", filter: "blur(0px)" };
    const hidden = { opacity: 0, transform: "translateY(-8px)", filter: "blur(4px)" };

    details.style.overflow = "hidden";
    const animations = [
      details.animate({ height: opening ? [`${closedHeight}px`, `${openHeight}px`] : [`${openHeight}px`, `${closedHeight}px`] }, timing),
      answer.animate(opening ? [hidden, shown] : [shown, hidden], timing),
    ];
    running.current = { animations, opening };

    animations[0].onfinish = () => {
      if (!running.current?.opening) details.open = false;
      details.style.overflow = "";
      animations.forEach((animation) => animation.cancel());
      running.current = null;
    };
  }

  return (
    <details
      ref={detailsRef}
      data-expanded={expanded}
      onToggle={(event) => !running.current && setExpanded(event.currentTarget.open)}
      className="group [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 pr-1 text-[15px] font-medium select-none focus-visible:outline-none"
      >
        <h3>{q}</h3>
        <span
          aria-hidden
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border border-line text-fg-muted",
            "transition-[transform,background-color,border-color,color] duration-300 ease-out-strong",
            "group-hover:border-line-strong group-hover:text-fg",
            // The focus ring goes on the icon so it isn't clipped while the row animates.
            "in-focus-visible:outline-2 in-focus-visible:outline-offset-2 in-focus-visible:outline-accent",
            "group-data-[expanded=true]:rotate-45 group-data-[expanded=true]:border-line-strong group-data-[expanded=true]:bg-surface-2 group-data-[expanded=true]:text-fg",
          )}
        >
          <svg viewBox="0 0 12 12" className="size-3" fill="none">
            <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div ref={answerRef} className="-mt-2 pr-10 pb-5">
        <p className="text-[15px] leading-relaxed text-fg-muted">{a}</p>
      </div>
    </details>
  );
}

export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  );
}
