# Aqib Plates

The new website for [Aqib Plates](https://www.aqibplates.com), replacing the current Wix site. It keeps the same features (plates for sale, plate request service, sold plates, FAQ, contact, online purchase) with a new design based on [Linear](https://linear.app) and [Emil Kowalski](https://emilkowal.ski).

See [docs/site-spec.md](docs/site-spec.md) for the full spec and style guide.

## Stack

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS 4 with design tokens in `src/app/globals.css`
- Motion for animation, Sonner for toasts, Vaul for drawers
- Sanity for the plate admin (embedded at `/studio`), Resend for form emails, Zod for validation
- Stripe Checkout for plate purchases and the £9.99 plate request fee

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
4. Open `/studio` on the site to add plates, change prices and mark plates sold. Plates are cached, so when running `npm run dev` hard refresh (Ctrl+Shift+R) to see an edit.
5. Add a webhook (filter `_type == "plate"`) pointing at `https://<domain>/api/revalidate` with the secret from `SANITY_REVALIDATE_SECRET`, so changes go live within seconds.

## Payments (Stripe)

1. Create a Stripe account, then put the secret key in `STRIPE_SECRET_KEY` (use the test key first).
2. Add a webhook endpoint at `https://<domain>/api/stripe/webhook` for `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.expired`, and put its signing secret in `STRIPE_WEBHOOK_SECRET`. Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. Turn on Apple Pay and Google Pay under Payment methods. Checkout shows them automatically.

How a sale works:
- **Buy Now** reserves the plate in Sanity for 30 minutes (so two people can't pay for it at once) and opens Stripe Checkout. It collects the buyer's address and phone number, plus an optional name for the V750.
- If the buyer goes back, the plate is released straight away. If they abandon checkout, Stripe expires the session and the webhook releases it.
- On payment the webhook marks the plate sold, which moves it to the Sold page. It also emails Aqib the V750 details and sends the buyer a confirmation.
- **Plate requests** take the £9.99 through Checkout first, then the webhook emails Aqib the request.
- Without Stripe keys, Buy Now opens the contact form with the plate filled in, and plate requests are emailed without payment.

## SEO

Built in from the start:

- Unique titles and descriptions per page via the Metadata API, canonical URLs, `en-GB` locale
- Generated Open Graph and Twitter images (a styled plate per page)
- `robots.txt` (blocks preview deployments), `sitemap.xml` (every page and plate), web manifest, icons
- JSON-LD structured data: `Store`, `WebSite`, `Product`/`Offer` and `BreadcrumbList` on every plate page, `ItemList` on the plates list, `FAQPage` on the FAQ, `Article` on each guide and `Service` on the plate request page
- A page per plate with its own title, description and share image; sold plate pages stay up and point visitors to similar plates
- Permanent redirects from every old Wix URL (`/product-page/*`, `/private-plates`, `/contact-4`, ...) so existing rankings carry over
- Registrations are real text, not images, so Google can index every plate
- Buyer guides at `/guides` (V750, transfers, display rules, plate formats) with `Article` structured data, linking readers on to plates for sale. Content lives in `src/content/guides.ts`
- Static rendering, self-hosted preloaded fonts, minimal client JavaScript, and reduced-motion support for strong Core Web Vitals
- Semantic HTML: one `h1` per page, labelled sections, skip link, accessible navigation

## Before launch

- **Terms of Sale and Privacy Policy** (`src/content/legal.ts`) are drafts based on the current site's policies. Aqib should check every line, and ideally have a solicitor review them.
- **Guides** (`src/content/guides.ts`) were checked against GOV.UK in October 2026. Aqib should check the wording.

## Fonts

Inter (SIL OFL) and UKNumberPlate are self-hosted in `src/fonts`. UKNumberPlate is a free Charles Wright lookalike by Gareth Attrill; its commercial-use terms still need confirming (see `src/fonts/uk-number-plate-LICENSE.txt`).

Registrations are laid out by `src/lib/plate-font.ts` from the font's own metrics: 79 mm characters on a 520 mm plate, 11 mm between characters, 33 mm between groups, with the ink centred exactly.
