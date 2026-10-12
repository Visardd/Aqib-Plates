import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-accent text-plate-ink hover:bg-accent-hover shadow-[0_0_0_1px_rgb(0_0_0/0.2)_inset,0_1px_0_rgb(255_255_255/0.4)_inset]",
  secondary: "bg-surface-2 text-fg border border-line hover:border-line-strong hover:bg-surface-3",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/5",
} as const;

const sizes = {
  sm: "h-8 px-3 text-[13px] rounded-lg",
  md: "h-10 px-4 text-sm rounded-[10px]",
  lg: "h-12 px-5 text-[15px] rounded-xl",
} as const;

type Style = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClass({ variant = "primary", size = "md" }: Style = {}, className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & Style) {
  return <button className={buttonClass({ variant, size }, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & Style) {
  return <Link className={buttonClass({ variant, size }, className)} {...props} />;
}
