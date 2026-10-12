import Link from "next/link";

const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = "text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg";

/** Renders text with `[label](/path)` links: internal ones as `<Link>`, web links in a new tab, mailto/tel as is. */
export function InlineText({ text }: { text: string }) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(linkPattern)) {
    const [whole, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={linkClass}>
          {label}
        </Link>
      ) : href.startsWith("http") ? (
        <a key={match.index} href={href} className={linkClass} target="_blank" rel="noopener">
          {label}
        </a>
      ) : (
        <a key={match.index} href={href} className={`${linkClass} whitespace-nowrap`}>
          {label}
        </a>
      ),
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
