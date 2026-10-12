# Aqib Plates: rebuild spec

Step 1 of the plan. This records what the current site does (so nothing is lost) and the design direction for the new one.

Source: https://www.aqibplates.com/ (Wix, read on 12 Oct 2026). Plate data is in [current-plates.csv](current-plates.csv).

## 1. What the current site does

| Page | Current URL | What it does |
|---|---|---|
| Home | `/` | Banner promoting Plate Request, grid of plates, "Browse our Private Plates" link |
| Private Plates | `/private-plates` | Grid of 6 plates per page with "Load More". Shows registration, price, "Out of stock" or "Add to cart", Quick View. "Sort by" label but no working sort, no search or filters |
| Plate page | `/product-page/<slug>` | Registration, price, stock state, notices (V750 takes up to 2 weeks, vehicle age restriction where relevant), "You may also like" |
| Plate Request | `/contact-4` | Paid service, £9.99. Fields: First Name, Email, Phone Number, Budget, "What would you like on your plate?". Button "Check out £9.99". Full refund if no matching plate is found |
| Sold | `/sold` | 18 sold plates shown as images only (no prices or dates) |
| FAQ | `/faq` | 7 questions (below) |
| Contact Us | `/contact-us` | Form: First Name, Last Name, Email, Message. "Thanks for submitting!" on send |
| Cart / account | `/cart-page`, `/account/my-account` | Wix cart and member login |

**Business details:** +44 7342 253120 · aqibplates@gmail.com · 128 City Road, London, EC1V 2NX. No social links or opening hours.

**Inventory today:** 20 plates listed, 10 available and 10 out of stock, priced £400 to £1,000.

**How a sale works:** buyer pays, then Aqib notifies the DVLA to issue a new V750 Certificate of Entitlement in the buyer's name, using the details from checkout. Takes up to 2 weeks. Sales are final ("Personalised Goods", no returns). Only the registration is sold, not physical plates.

**FAQ topics:** DVLA/UK compliance; no physical plates supplied; how the V750 process works; certificate timing (up to 2 weeks, depends on DVLA and Royal Mail); no licence or vehicle needed to buy; no changes or cancellations; advertised price is final, spacing can be adjusted (contact to confirm it meets V750/V778 rules).

## 2. What the new site keeps, fixes and adds

**Keeps:** every page above, the £9.99 request service with refund promise, the FAQ content, contact details, and all the purchase notices.

**Fixes:**
- Sold plates become real data (registration, sold date, optional price) instead of image files, and a plate moves there automatically when it sells.
- Out-of-stock plates stop cluttering the main listing; they live on Sold.
- Real sort (price, newest) plus search and filters (price range, style such as dateless, initials, words).
- Plates render as styled UK number plates (yellow/white plate look, Charles Wright style font) instead of photos.

**Changes (my defaults, edit if you disagree):**
- **No customer accounts.** Guest checkout only, which is simpler and what a one-off purchase needs. Wix's member login goes away.
- **Buy Now instead of a cart.** Each plate is unique, so one plate per checkout. The cart page goes away.
- **Checkout collects what the V750 needs:** full name, address, email, phone, and agreement to the no-refunds terms.
- Old URLs (`/product-page/...`, `/contact-4`) redirect to the new ones so existing links and Google results keep working.

## 3. Data the customer will manage

**Plate:** registration, display spacing, price, status (available, reserved, sold), sold date, style tags, optional notes (e.g. "valid on vehicles registered after 1 Sep 2005"), featured flag.

**Plate request:** name, email, phone, budget, what they want, payment status.

**Contact message:** first name, last name, email, message.

Managed in Sanity (a hosted admin panel, free tier is enough). Requests and messages arrive by email.

## 4. Style guide

Built from my knowledge of both reference sites (their pages can't be loaded from my environment, so values below are close matches, not copied CSS).

**From Linear: the overall look**
- Dark-first. Background `#08090a`, raised surfaces `#0f1011` / `#151617`, hairline borders `rgba(255,255,255,0.08)`.
- Text `#f7f8f8`, secondary `#8a8f98`, muted `#62666d`.
- Type: Inter (variable). Big, tight headlines: 56 to 72px, weight 510 to 590, letter-spacing about -0.022em. Body 15 to 16px.
- Restraint: one accent. For Aqib, the accent is UK plate yellow `#f5c518` used sparingly (buttons, highlights, the plates themselves), instead of Linear's indigo.
- Soft radial glows behind hero content, subtle gradient text on headlines, 1px borders instead of shadows.
- Sections with small labels above headings (Linear's "Fig 0.1" style), e.g. "01 Browse", "02 Buy", "03 DVLA transfer".
- Thin sticky top nav with blur behind it.

**From Emil Kowalski: the motion and components**
- Short, purposeful animation. Most transitions 150 to 300ms, ease-out, e.g. `cubic-bezier(0.32, 0.72, 0, 1)` (the curve Vaul uses).
- Buttons scale to 0.97 on press. Nothing animates on every hover just because it can.
- **Sonner** toasts for "Message sent", "Request received", copy-to-clipboard.
- **Vaul** drawer for the plate quick view and filters on mobile.
- Clip-path reveals for headline text, staggered fade-up for the plate grid.
- Respect "reduce motion" settings.

**Signature components for Aqib**
- `Plate`: a realistic UK plate (front white or rear yellow, GB band optional) that renders any registration with correct spacing. Used everywhere.
- `PlateCard`: plate + price + Buy Now, with hover glow.
- Hero: one large animated plate that cycles through featured registrations.
- `SoldTicker`: a slow marquee of recently sold plates as social proof.
- Plate Request as a short stepped form (budget, then idea, then details, then pay £9.99).

## 5. Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Motion (Framer Motion), Radix primitives, Sonner, Vaul. Sanity for plates. Stripe Checkout for plate purchases and the £9.99 request fee, with a webhook that marks plates sold and emails Aqib (via Resend). Hosting later; Vercel fits this stack best and has free preview links.

## 6. Open questions for the customer

1. Can Aqib export products from the Wix dashboard (Store Products → Export to CSV)? It would confirm exact registrations and give the full history. Two in the CSV don't match their URLs (RO63RY X, OO1 5TFU).
2. Prices and dates for the 18 sold plates, if he wants them shown.
3. Does he have a logo, or should the new site get a simple wordmark?
4. Does he already have a Stripe account?
