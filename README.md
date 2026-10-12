# Aqib Plates

The new website for [Aqib Plates](https://www.aqibplates.com), replacing the current Wix site. It keeps the same features (plates for sale, plate request service, sold plates, FAQ, contact, online purchase) with a new design based on [Linear](https://linear.app) and [Emil Kowalski](https://emilkowal.ski).

See [docs/site-spec.md](docs/site-spec.md) for the full spec and style guide.

## Stack

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS 4 with design tokens in `src/app/globals.css`
- Motion for animation, Sonner for toasts, Vaul for drawers
- Sanity for the plate admin (embedded at `/studio`), Resend for form emails, Zod for validation
- Coming next: Stripe checkout

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Copy `.env.example` to `.env.local` and fill in what you have. Everything is optional for local development: without Sanity the site uses `src/data/seed-plates.json`, and without Resend form submissions are logged to the console.

## Plate admin (Sanity)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) and put its ID in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
2. In the project's API settings, add `http://localhost:3000` and the live domain as CORS origins (with credentials).
3. Create an Editor token and import the current plates once: `SANITY_API_WRITE_TOKEN=... node scripts/seed-sanity.mjs`
4. Open `/studio` on the site to add plates, change prices and mark plates sold.
5. Add a webhook (filter `_type == "plate"`) pointing at `https://<domain>/api/revalidate` with the secret from `SANITY_REVALIDATE_SECRET`, so changes go live within seconds.

## SEO

Built in from the start:

- Unique titles and descriptions per page via the Metadata API, canonical URLs, `en-GB` locale
- Generated Open Graph and Twitter images (a styled plate per page)
- `robots.txt` (blocks preview deployments), `sitemap.xml` (every page and plate), web manifest, icons
- JSON-LD structured data: `Store`, `WebSite`, `Product`/`Offer` and `BreadcrumbList` on every plate page, `ItemList` on the plates list, `FAQPage` on the FAQ and `Service` on the plate request page
- A page per plate with its own title, description and share image; sold plate pages stay up and point visitors to similar plates
- Permanent redirects from every old Wix URL (`/product-page/*`, `/private-plates`, `/contact-4`, ...) so existing rankings carry over
- Registrations are real text, not images, so Google can index every plate
- Static rendering, self-hosted preloaded fonts, minimal client JavaScript, and reduced-motion support for strong Core Web Vitals
- Semantic HTML: one `h1` per page, labelled sections, skip link, accessible navigation

## Fonts

Inter (SIL OFL) and Barlow Condensed (SIL OFL) are self-hosted in `src/fonts`. Barlow Condensed stands in for the official Charles Wright plate font, which needs a commercial licence.
