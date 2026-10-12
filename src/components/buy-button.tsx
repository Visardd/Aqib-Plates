"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { startCheckout } from "@/app/actions/checkout";

export function BuyButton({ slug, reserved }: { slug: string; reserved: boolean }) {
  const [state, action, pending] = useActionState(() => startCheckout(slug), null);

  useEffect(() => {
    if (state?.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="flex-1">
      <Button type="submit" size="lg" className="w-full" disabled={reserved || pending}>
        {reserved ? "Reserved" : pending ? "Opening checkout…" : "Buy now"}
      </Button>
    </form>
  );
}
