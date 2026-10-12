"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Logo } from "./logo";
import { ButtonLink } from "./button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-200",
        scrolled ? "border-line bg-canvas/75" : "border-transparent bg-canvas/0",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-lg focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/plates" size="sm" className="hidden sm:inline-flex">
            Browse plates
          </ButtonLink>
          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger
              className="grid size-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-white/5 hover:text-fg md:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M3 6h12M3 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60" />
              <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border border-b-0 border-line-strong bg-surface pb-8 outline-none">
                <Drawer.Handle className="mt-3 !bg-white/20" />
                <Drawer.Title className="sr-only">Menu</Drawer.Title>
                <nav aria-label="Mobile" className="px-4 pt-4">
                  <ul className="flex flex-col">
                    {nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex h-12 items-center rounded-lg px-3 text-[17px] font-medium text-fg transition-colors active:bg-white/5"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/plates" size="lg" className="mt-4 w-full" onClick={() => setOpen(false)}>
                    Browse plates
                  </ButtonLink>
                </nav>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
