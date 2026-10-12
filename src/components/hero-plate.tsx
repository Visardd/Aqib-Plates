"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { plateBand, plateText } from "@/lib/plate-font";

const ease = [0.23, 1, 0.32, 1] as const;

// Shown until there are plates for sale, e.g. on a brand new Sanity dataset.
const placeholder = "AQ1B PL8";

/** The hero's big plate, cycling through featured registrations one character at a time. */
export function HeroPlate({ registrations }: { registrations: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || registrations.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % registrations.length), 3200);
    return () => clearInterval(id);
  }, [reduce, registrations.length]);

  const registration = registrations.length ? registrations[index % registrations.length] : placeholder;
  const { text: reg, fontSize, letterSpacing, wordSpacing, offset } = plateText(registration, { width: 100, band: true });

  return (
    <div className="@container relative w-full">
      <div className="relative flex aspect-[520/111] w-full overflow-hidden rounded-[2.4cqw] bg-plate-yellow text-plate-ink shadow-[0_1px_0_rgb(255_255_255/0.4)_inset,0_30px_80px_-20px_rgb(253_208_0/0.35),0_20px_40px_-20px_rgb(0_0_0/0.9)]">
        <span
          aria-hidden
          className="flex shrink-0 flex-col items-center justify-end bg-plate-band pb-[2.2cqw] text-[3.6cqw] leading-none font-bold tracking-wide text-white"
          style={{ width: `${plateBand * 100}cqw` }}
        >
          UK
        </span>
        <span className="sr-only">
          {reg}
        </span>
        <span
          aria-hidden
          className="flex flex-1 items-center justify-center font-plate leading-none whitespace-pre transition-[font-size,letter-spacing,word-spacing,transform] duration-300"
          style={{
            fontSize: `${fontSize.toFixed(3)}cqw`,
            letterSpacing: `${letterSpacing.toFixed(3)}cqw`,
            wordSpacing: `${wordSpacing.toFixed(3)}cqw`,
            transform: `translateX(${offset.toFixed(3)}cqw)`,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {reg.split("").map((char, i) => (
              <motion.span
                key={`${reg}-${i}`}
                className="inline-block"
                initial={{ y: "40%", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-40%", opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease, delay: i * 0.035 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[0.9cqw] rounded-[1.8cqw] border-[0.3cqw] border-plate-ink/80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(170deg,rgb(255_255_255/0.5)_0%,transparent_38%,transparent_70%,rgb(0_0_0/0.08)_100%)]"
        />
      </div>
    </div>
  );
}
