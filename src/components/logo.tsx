import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight" aria-label={`${site.name} home`}>
      <span
        aria-hidden
        className="grid h-6 w-9 place-items-center rounded-[5px] bg-plate-yellow font-plate text-[15px] leading-none font-semibold text-plate-ink shadow-[0_0_0_1px_rgb(0_0_0/0.5)_inset]"
      >
        AP
      </span>
      {site.name}
    </Link>
  );
}
