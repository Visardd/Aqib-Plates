import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Plates",
    links: [
      { href: "/plates", label: "Private plates for sale" },
      { href: "/plate-request", label: "Plate finding service" },
      { href: "/sold", label: "Recently sold" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact us" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            Private number plates for sale across the UK, with the DVLA paperwork handled for you.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-[13px] font-medium text-fg">{col.title}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <address className="not-italic">
          <h2 className="text-[13px] font-medium text-fg">Get in touch</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-fg-muted">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-fg">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              {site.address.street}, {site.address.locality} {site.address.postalCode}
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-fg-subtle sm:flex-row sm:justify-between">
          <p>© {site.legalName}. All rights reserved.</p>
          <p>We sell registration rights only, not physical number plates.</p>
        </div>
      </div>
    </footer>
  );
}
