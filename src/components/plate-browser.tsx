"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { PlateCard } from "./plate-card";
import { ButtonLink } from "./button";
import { matchesSearch, type Plate } from "@/lib/plates";
import { cn } from "@/lib/cn";

const priceBands = [
  { id: "all", label: "Any price", test: () => true },
  { id: "u500", label: "Under £500", test: (p: number) => p < 500 },
  { id: "500-750", label: "£500 to £750", test: (p: number) => p >= 500 && p <= 750 },
  { id: "750+", label: "Over £750", test: (p: number) => p > 750 },
] as const;

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
] as const;

type BandId = (typeof priceBands)[number]["id"];
type SortId = (typeof sorts)[number]["id"];

const ease = [0.23, 1, 0.32, 1] as const;

export function PlateBrowser({ plates }: { plates: Plate[] }) {
  const [query, setQuery] = useState("");
  const [band, setBand] = useState<BandId>("all");
  const [sort, setSort] = useState<SortId>("featured");

  const results = useMemo(() => {
    const test = priceBands.find((b) => b.id === band)!.test;
    const filtered = plates.filter((p) => matchesSearch(p, query) && (p.price === undefined || test(p.price)));
    if (sort === "featured") return filtered;
    const dir = sort === "price-asc" ? 1 : -1;
    return [...filtered].sort((a, b) => ((a.price ?? 0) - (b.price ?? 0)) * dir);
  }, [plates, query, band, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search registrations</span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fg-subtle"
            fill="none"
          >
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a word, name or initials, e.g. BEG or REV"
            autoComplete="off"
            className="h-11 w-full rounded-xl border border-line bg-surface pr-4 pl-10 text-[15px] text-fg placeholder:text-fg-subtle transition-colors outline-none hover:border-line-strong focus:border-accent/60"
          />
        </label>
        <label className="relative md:w-56">
          <span className="sr-only">Sort plates</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface px-4 text-[15px] text-fg outline-none hover:border-line-strong focus:border-accent/60"
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-fg-subtle" fill="none">
            <path d="m4.5 6.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
      </div>

      <div role="group" aria-label="Filter by price" className="mt-4 flex flex-wrap gap-2">
        {priceBands.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={band === b.id}
            onClick={() => setBand(b.id)}
            className={cn(
              "relative h-8 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150 active:scale-[0.97]",
              band === b.id ? "text-plate-ink" : "border border-line text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {band === b.id && (
              <motion.span
                layoutId="band-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ duration: 0.3, ease }}
              />
            )}
            <span className="relative">{b.label}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-8 text-[13px] text-fg-muted">
        {results.length} {results.length === 1 ? "plate" : "plates"} {query || band !== "all" ? "match" : "for sale"}
      </p>

      <motion.ul layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((plate) => (
            <motion.li
              key={plate.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease }}
            >
              <PlateCard plate={plate} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-lg font-medium tracking-tight">No plates match that yet</p>
          <p className="mt-2 max-w-sm text-[15px] text-fg-muted">
            Tell us what you&apos;re after and we&apos;ll search the DVLA database for you.
          </p>
          <ButtonLink href="/plate-request" className="mt-6">
            Request a plate for £9.99
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
