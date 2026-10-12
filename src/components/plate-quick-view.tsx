"use client";

import { Drawer } from "vaul";
import { toast } from "sonner";
import { Plate } from "./plate";
import { Button, ButtonLink } from "./button";
import { formatPrice, type Plate as PlateData } from "@/lib/plates";
import { site } from "@/lib/site";

export function PlateQuickView({ plate }: { plate: PlateData }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(plate.registration);
      toast.success(`Copied ${plate.registration}`);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  }

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm" className="relative z-10">
          Quick view
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-xl flex-col rounded-t-2xl border border-b-0 border-line-strong bg-surface outline-none">
          <Drawer.Handle className="mt-3 !bg-white/20" />
          <div className="flex flex-col gap-6 p-6 pb-10">
            <Plate registration={plate.registration} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <Drawer.Title className="text-lg font-medium tracking-tight">{plate.registration}</Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-fg-muted">
                  Supplied on a DVLA V750 certificate in your name, {site.certificateLeadTime}.
                </Drawer.Description>
                {plate.note && <p className="mt-2 text-sm text-fg-muted">{plate.note}</p>}
              </div>
              {plate.price !== undefined && (
                <p className="text-2xl font-medium tracking-tight tabular-nums">{formatPrice(plate.price)}</p>
              )}
            </div>
            <div className="flex gap-3">
              <ButtonLink href={`/plates/${plate.slug}`} size="lg" className="flex-1">
                {plate.status === "sold" ? "View plate" : "View and buy"}
              </ButtonLink>
              <Button variant="secondary" size="lg" onClick={copy}>
                Copy
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
