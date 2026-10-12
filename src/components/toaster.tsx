"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: "!bg-surface-2 !border-line-strong !text-fg !rounded-xl !font-sans",
          description: "!text-fg-muted",
        },
      }}
    />
  );
}
