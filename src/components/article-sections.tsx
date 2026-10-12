import { InlineText } from "./inline-text";
import type { GuideSection } from "@/content/guides";

export const sectionAnchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Long-form body for guides and legal pages: an h2 per section with paragraphs and an optional list. */
export function ArticleSections({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => {
        const id = sectionAnchor(section.heading);
        return (
          <section key={id} aria-labelledby={id}>
            <h2 id={id} className="scroll-mt-24 text-xl font-medium tracking-tight">
              {section.heading}
            </h2>
            {section.body.map((text) => (
              <p key={text} className="mt-4 text-base leading-[1.7] text-fg/80">
                <InlineText text={text} />
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-[1.6] text-fg/80">
                    <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <InlineText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** "On this page" links to each section heading. Shown beside the article on large screens. */
export function TableOfContents({ sections }: { sections: GuideSection[] }) {
  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <h2 className="text-[13px] font-medium text-fg">On this page</h2>
      <ul className="mt-4 flex flex-col gap-2.5 border-l border-line">
        {sections.map((section) => (
          <li key={section.heading}>
            <a
              href={`#${sectionAnchor(section.heading)}`}
              className="-ml-px block border-l border-transparent pl-4 text-[13px] leading-snug text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
