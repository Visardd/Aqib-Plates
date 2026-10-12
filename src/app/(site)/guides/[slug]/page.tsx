import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleSections, TableOfContents } from "@/components/article-sections";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button";
import { GuideCard } from "@/components/guide-card";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { getGuide, guides } from "@/content/guides";
import { formatDate } from "@/lib/dates";
import { site } from "@/lib/site";
import { articleSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      url: `/guides/${guide.slug}`,
      type: "article",
      title: guide.title,
      description: guide.description,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  // The next two guides in order, so every guide gets linked from two others.
  const at = guides.indexOf(guide);
  const others = [1, 2].map((n) => guides[(at + n) % guides.length]);

  return (
    <>
      <JsonLd data={articleSchema({ path, title: guide.title, description: guide.description, updated: guide.updated })} />
      <div className="container-page pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]}
        />
      </div>

      <div className="container-page grid gap-12 pt-10 pb-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
        <article className="max-w-[68ch]">
          <Reveal>
            <header>
              <p className="text-[13px] font-medium text-accent">Guide</p>
              <h1 className="mt-3 text-title text-gradient">{guide.title}</h1>
              <p className="mt-5 text-[17px] leading-relaxed text-fg-muted md:text-lg">{guide.intro}</p>
              <p className="mt-6 text-[13px] text-fg-subtle">
                Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> by {site.name}
              </p>
            </header>
          </Reveal>

          <div className="mt-12 border-t border-line pt-10">
            <ArticleSections sections={guide.sections} />
          </div>
        </article>

        <aside className="flex h-fit flex-col gap-8 lg:sticky lg:top-24">
          <TableOfContents sections={guide.sections} />
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-lg font-medium tracking-tight">Ready to find your plate?</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
              Every plate we sell comes with the V750 paperwork handled for you.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <ButtonLink href="/plates">Browse plates for sale</ButtonLink>
              <ButtonLink href="/plate-request" variant="secondary">
                Find me a plate for £{site.requestFee}
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="more-guides" className="container-page py-12">
        <h2 id="more-guides" className="text-xl font-medium tracking-tight">
          More guides
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
    </>
  );
}
