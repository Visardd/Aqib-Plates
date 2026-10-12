# Aqib Plates

The new website for [Aqib Plates](https://www.aqibplates.com), replacing the current Wix site. It keeps the same features (plates for sale, plate request service, sold plates, FAQ, contact, online purchase) with a new design based on [Linear](https://linear.app) and [Emil Kowalski](https://emilkowal.ski).

See [docs/site-spec.md](docs/site-spec.md) for the full spec and style guide.

## Stack

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS 4 with design tokens in `src/app/globals.css`
- Motion for animation, Sonner for toasts, Vaul for drawers
- Coming next: Sanity (plate admin), Stripe (checkout), Resend (emails)

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` if the site is served from anywhere other than `https://www.aqibplates.com`, and `GOOGLE_SITE_VERIFICATION` once Search Console is set up.

## SEO

Built in from the start:

- Unique titles and descriptions per page via the Metadata API, canonical URLs, `en-GB` locale
- Generated Open Graph and Twitter images (a styled plate per page)
- `robots.txt` (blocks preview deployments), `sitemap.xml` (every page and plate), web manifest, icons
- JSON-LD structured data: `Store` (with address and phone), `WebSite`, and `Product`/`Offer` and `BreadcrumbList` helpers for plate pages
- Permanent redirects from every old Wix URL (`/product-page/*`, `/private-plates`, `/contact-4`, ...) so existing rankings carry over
- Registrations are real text, not images, so Google can index every plate
- Static rendering, self-hosted preloaded fonts, minimal client JavaScript, and reduced-motion support for strong Core Web Vitals
- Semantic HTML: one `h1` per page, labelled sections, skip link, accessible navigation

## Fonts

Inter (SIL OFL) and Barlow Condensed (SIL OFL) are self-hosted in `src/fonts`. Barlow Condensed stands in for the official Charles Wright plate font, which needs a commercial licence.
