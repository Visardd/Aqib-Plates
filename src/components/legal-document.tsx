import { ArticleSections, TableOfContents } from "./article-sections";
import { Breadcrumbs } from "./breadcrumbs";
import type { LegalDoc } from "@/content/legal";
import { formatDate } from "@/lib/dates";

export function LegalDocument({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <>
      <div className="container-page pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: doc.title, path },
          ]}
        />
      </div>
      <div className="container-page grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <article className="max-w-[68ch]">
          <header>
            <h1 className="text-title text-gradient">{doc.title}</h1>
            <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">{doc.intro}</p>
            <p className="mt-6 text-[13px] text-fg-subtle">
              Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
            </p>
          </header>
          <div className="mt-12 border-t border-line pt-10">
            <ArticleSections sections={doc.sections} />
          </div>
        </article>
        <aside className="h-fit lg:sticky lg:top-24">
          <TableOfContents sections={doc.sections} />
        </aside>
      </div>
    </>
  );
}
