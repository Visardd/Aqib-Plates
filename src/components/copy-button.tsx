"use client";

import { toast } from "sonner";
import { Button } from "./button";

export function ShareButton({ title, url }: { title: string; url: string }) {
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied", { description: "Send it to whoever you're buying for." });
    } catch (err) {
      if ((err as Error).name !== "AbortError") toast.error("Couldn't share this plate");
    }
  }

  return (
    <Button variant="secondary" size="lg" onClick={share}>
      Share
    </Button>
  );
}
