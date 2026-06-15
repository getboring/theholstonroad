# The Holston Road

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare-orange.svg)](https://workers.cloudflare.com)
[![Stack](https://img.shields.io/badge/Stack-TanStack%20Start%20%2B%20Cloudflare-blue.svg)](https://tanstack.com/start)

> A music heritage trail for Northeast Tennessee — from the 1927 Bristol Sessions to the stages of today.

**Live Production URL:** [https://theholstonroad.codyboring.workers.dev](https://theholstonroad.codyboring.workers.dev)

**Custom Domain Status:** `theholstonroad.org` is planned, but the Cloudflare zone is not configured in this account yet. Until that exists, production canonicals and generated SEO assets should use the Workers URL above.

**Canonical Base URL:** `src/lib/seo.ts` is the single source of truth. It resolves
`VITE_SITE_URL` first, then `SITE_URL`, and finally falls back to the Workers URL above. `pnpm build`
runs `pnpm seo:generate` before Vite, so canonicals, Open Graph URLs, JSON-LD, `robots.txt`, and
`sitemap.xml` stay in sync from one value. Do not hand-edit `public/robots.txt` or
`public/sitemap.xml`.

---

## What This Is

The Holston Road is a **music heritage trail** for the Tri-Cities region of Northeast Tennessee (Bristol, Kingsport, Johnson City). It connects the venues, festivals, and stories that made this region the **birthplace of country music** — and shows you where the sound is still being made today.

Think of it as the Tri-Cities' answer to [The Crooked Road](https://thecrookedroadva.com) — Virginia's Heritage Music Trail. Same product type. Same mission. Different region. Our own version.

**The story we tell:**
- The 1927 Bristol Sessions — where Jimmie Rodgers and The Carter Family were recorded
- The Birthplace of Country Music Museum
- Bristol Rhythm & Roots Reunion
- ETSU's nationally recognized Bluegrass, Old Time and Country Music program
- Live music venues, pickin' parties, and jams across the Tri-Cities

**This is not a frontier history trail.** It's a music trail. The sound is the story.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | TanStack Start (full-stack React, file-based routing) |
| **Styling** | Tailwind CSS v4 |
| **Database** | Cloudflare D1 (SQLite) — shared with Trailhead |
| **ORM** | Drizzle ORM |
| **Hosting** | Cloudflare Workers |
| **Build Tool** | Vite 8 + `@cloudflare/vite-plugin` |
| **E2E Testing** | Playwright (Chromium, Firefox, WebKit, mobile) |
| **Unit Testing** | Vitest + jsdom + React Testing Library |

---

## Project Structure

```
├── src/
│   ├── routes/                    # TanStack Router file-based routes
│   │   ├── __root.tsx             # Root layout with SEO meta, JSON-LD, canonical links
│   │   ├── index.tsx              # Homepage
│   │   ├── about.tsx              # Mission + music story + partner proof
│   │   ├── the-trail.tsx          # Trail overview + route stats
│   │   ├── events.tsx             # Event calendar
│   │   ├── stories.tsx            # Audio stories + chapter links + newsletter CTA
│   │   ├── guides/                # SEO-ready planning guides
│   │   │   ├── index.tsx          # Guides hub page
│   │   │   └── $slug.tsx          # Guide detail pages
│   │   ├── chapters/              # 5 music story chapters
│   │   │   ├── the-sound.tsx           # Chapter 1: Appalachian roots
│   │   │   ├── the-railroad.tsx        # Chapter 2: How musicians traveled
│   │   │   ├── the-sessions.tsx        # Chapter 3: 1927 Bristol Sessions
│   │   │   ├── the-festival.tsx        # Chapter 4: Rhythm & Roots
│   │   │   └── the-next-generation.tsx # Chapter 5: ETSU Bluegrass
│   │   ├── api/
│   │   │   └── subscribe.ts       # Newsletter signup server route (POST /api/subscribe)
│   │   └── sites/                 # Venue directory + detail
│   │       ├── index.tsx
│   │       └── $slug.tsx
│   ├── components/                # Shared UI components
│   │   ├── Header.tsx             # Sticky header with desktop nav + mobile <details> menu
│   │   ├── Footer.tsx             # Site footer with nav links + social icons
│   │   ├── NewsletterSignup.tsx   # Client-side newsletter form (react-hook-form + zod)
│   │   ├── TrailRouteExperience.tsx # SVG route preview + venue discovery panel
│   │   ├── VenuePlaceholder.tsx   # SVG placeholder images with geometric patterns
│   │   ├── AudioPlayer.tsx        # Audio player with "coming soon" state
│   │   ├── NotFoundPage.tsx       # 404 page (router default)
│   │   ├── ErrorPage.tsx          # Error boundary (router default)
│   │   ├── LoadingSpinner.tsx     # Loading state (router default) with a11y attributes
│   │   └── guides/
│   │       ├── GuideArticlePage.tsx   # Full guide article template with JSON-LD
│   │       └── GuideCard.tsx          # Guide preview card for hub listing
│   ├── db/                        # Database schema + queries
│   │   ├── schema.ts              # Drizzle schema (shared with Trailhead)
│   │   ├── queries.ts             # Holston Road-specific D1 queries
│   │   └── seeds/                 # Seed data
│   │       ├── holston-road.ts    # Holston Road trail seed data
│   │       ├── crooked-road.ts    # Crooked Road trail seed data
│   │       └── runner.ts          # Seed runner script
│   ├── lib/                       # Utilities
│   │   ├── db-binding.ts          # Defensive D1 binding extractor (getDbBinding)
│   │   ├── colors.ts              # Brand color system (OKLCH)
│   │   └── seo.ts                 # Central site URL + SEO helpers + sitemap entries
│   ├── logic/                     # Business logic + content data
│   │   ├── guides.ts              # Guide definitions + content
│   │   ├── partner-proof.ts       # Regional partner data
│   │   └── planning.ts            # Planning/itinerary logic
│   ├── router.tsx                 # Router config with default components
│   └── styles.css                 # Tailwind + custom fonts + theme
├── scripts/
│   ├── generate-seo-assets.ts     # Build-time robots.txt + sitemap.xml generation
│   └── patch-worker-entry.js      # Post-build patch for Cloudflare env bindings
├── e2e/                           # Playwright end-to-end tests
│   ├── accessibility.spec.ts      # h1 presence, focus visibility, console errors
│   ├── events.spec.ts             # Events page structure
│   ├── guides.spec.ts             # Guides hub + detail pages
│   ├── layout.spec.ts             # Header/footer presence, footer links
│   ├── navigation.spec.ts         # Route loading, 404s, header nav, mobile menu
│   ├── newsletter.spec.ts         # Form visibility, validation, link navigation
│   └── venues.spec.ts             # Venue directory + detail pages
├── public/                        # Static assets
│   ├── favicon.svg
│   ├── robots.txt                 # Generated by pnpm seo:generate
│   └── sitemap.xml                # Generated by pnpm seo:generate
├── playwright.config.ts           # Playwright: 5 projects (desktop + mobile)
├── vitest.config.ts               # Vitest: unit tests in src/**/*.test.{ts,tsx}
├── wrangler.jsonc                 # Cloudflare config with D1 binding
├── vite.config.ts                 # Vite + TanStack Start + Cloudflare plugin
└── package.json
```

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run local dev server
pnpm dev

# Build with Workers fallback URL
pnpm build

# Build with an explicit canonical URL
VITE_SITE_URL=https://theholstonroad.codyboring.workers.dev pnpm build

# Run unit tests (Vitest)
pnpm test

# Run e2e tests (Chromium, Firefox, WebKit + mobile viewports)
pnpm test:e2e

# Deploy to Cloudflare (builds + patches + deploys)
pnpm deploy
```

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start local dev server on port 3000 |
| `pnpm build` | Generate SEO assets + Vite production build |
| `pnpm preview` | Build + start local preview server |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run Playwright e2e tests |
| `pnpm deploy` | Full deploy pipeline: build → patch → wrangler deploy |
| `pnpm patch-worker` | Run post-build patch script only |
| `pnpm seo:generate` | Regenerate `public/robots.txt` + `public/sitemap.xml` |
| `pnpm db:seed` | Run seed script against database |
| `pnpm cf-typegen` | Generate Wrangler TypeScript types |

---

## Testing

### Unit Tests (Vitest)

Unit and component tests live in `src/**/*.test.{ts,tsx}` and run with Vitest + jsdom:

```bash
pnpm test
```

Configured in `vitest.config.ts` with `tsconfigPaths` for `#/*` alias support.

### E2E Tests (Playwright)

End-to-end tests cover all routes across desktop and mobile viewports:

```bash
# Run all e2e tests (Chromium, Firefox, WebKit + mobile)
pnpm test:e2e

# Run a specific test file
npx playwright test e2e/navigation.spec.ts

# Run with UI mode for debugging
npx playwright test --ui

# Run against an already-running dev server
PLAYWRIGHT_SKIP_WEBSERVER=1 pnpm test:e2e
```

**Test coverage:**
- **Navigation** — all static routes, DB routes, 404 handling, header nav, mobile menu open/close
- **Accessibility** — h1 presence on every page, focus visibility, console error monitoring
- **Layout** — header and footer presence on all routes, footer link verification
- **Venues** — directory page structure, detail pages for known slugs
- **Events** — events page structure
- **Guides** — hub page heading, detail page heading and breadcrumbs
- **Newsletter** — form visibility, validation (Chromium/Firefox), link navigation

**Browsers tested:** Chromium (desktop), Firefox (desktop), WebKit/Safari (desktop), Chrome mobile (Pixel 5), Safari mobile (iPhone 12).

**Notes:**
- Newsletter validation tests are skipped on WebKit due to a known Playwright automation quirk with React synthetic events in hydrated apps — the form works correctly for real Safari users.
- The desktop nav visibility test is skipped on mobile viewports where the desktop nav is intentionally hidden.
- DB routes are tested leniently (h1 visible check) because D1 bindings may not be injectable in local dev mode.

---

## The Cloudflare Env Binding Problem

TanStack Start's `@cloudflare/vite-plugin` does **not** reliably pass Cloudflare `env` (including D1 bindings) into route `loader` context in production. The built worker entry does not forward `env` and `ctx` to the TanStack Start handler.

### The Fix

We use a **post-build patch script** (`scripts/patch-worker-entry.js`) that modifies `dist/server/index.js` after `vite build` and before `wrangler deploy`.

The patch replaces the virtual worker entry with one that explicitly passes `{ context: { cloudflare: { env, ctx } } }` to the TanStack Start fetch handler. This flows through the framework as `serverContext` on loader arguments and is also available to app-owned server routes through handler `context`.

**All DB-dependent routes** use `getDbBinding(loaderArgs)` from `src/lib/db-binding.ts` to defensively extract `env.DB` from multiple possible paths:

```ts
export function getDbBinding(params: unknown): D1Database {
  const serverContext = (params as any)?.serverContext
  if (serverContext?.cloudflare?.env?.DB) {
    return serverContext.cloudflare.env.DB as D1Database
  }

  const routeContext = (params as any)?.context
  if (routeContext?.cloudflare?.env?.DB) {
    return routeContext.cloudflare.env.DB as D1Database
  }

  const prodEnv = (process as any).env
  if (prodEnv?.DB) {
    return prodEnv.DB as D1Database
  }

  throw new Error(
    "D1 database binding 'DB' not found. Make sure it's configured in wrangler.jsonc.",
  )
}
```

**Critical:** Pass the **full** `loaderArgs` object — do **not** destructure `context` from it. TanStack Start places the Cloudflare env at `loaderArgs.serverContext`, not `loaderArgs.context`.

The newsletter write path is implemented in `src/routes/api/subscribe.ts`, so `/api/subscribe` is owned by the app instead of being hard-coded inside the post-build worker patch.

This is integrated into the deploy script:

```json
"deploy": "npm run build && node scripts/patch-worker-entry.js && wrangler deploy"
```

---

## Database

This project reads from the **shared Trailhead D1 database** (`trailhead-db`). The Holston Road is stored as `slug = "holston-road"` in the `trails` table, with related venues, events, waysides, and subscribers scoped by `trail_id`.

### Schema

See `src/db/schema.ts` for full table definitions. Key tables:

| Table | Purpose |
|-------|---------|
| `trails` | Trail metadata, colors, branding |
| `venues` | Music venues, museums, theaters, festival sites |
| `events` | Recurring jams, concerts, festivals |
| `waysides` | Narrative content (chapters) |
| `dmo_contacts` | Regional tourism office contacts |
| `subscribers` | Newsletter email signups |

All IDs use **ULID** (via `ulidx`), not auto-increment or UUID v4.

### Seeding

Seed data lives in `src/db/seeds/holston-road.ts`. It was applied to the remote D1 via a custom seed runner. To re-seed or update data:

```bash
pnpm db:seed
```

### Adding a New Table

1. Add the table to `src/db/schema.ts`
2. Add type exports at the bottom of `schema.ts`
3. Add query helpers to `src/db/queries.ts`
4. Apply schema changes to remote D1 with raw SQL:
   ```bash
   npx wrangler d1 execute trailhead-db --remote --command "CREATE TABLE ..."
   ```

---

## Features

### SEO & Meta Tags

Every route implements:
- **Open Graph** tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`)
- **Twitter Card** tags (`twitter:card`, `twitter:title`, `twitter:description`)
- **JSON-LD** structured data (`TouristAttraction` schema on root route)
- **Canonical links** on every page via the `head` callback
- `robots.txt`, `sitemap.xml`, and `favicon.svg` in `public/`

Canonical URLs and static SEO assets are centralized in `src/lib/seo.ts` and generated during
`pnpm build` via `pnpm seo:generate`.

`robots.txt` and `sitemap.xml` are regenerated on every build from `STATIC_SITEMAP_ENTRIES`.
Today that sitemap is still maintained from a static route list; if you add or remove crawlable routes, update
`src/lib/seo.ts` instead of editing files in `public/`.

Dynamic routes (e.g., `/sites/$slug`) build canonical URLs from `loaderData`:

```ts
head: ({ loaderData }) =>
  createPageHead({
    title: loaderData ? `${loaderData.venue.name} — The Holston Road` : 'Site — The Holston Road',
    description: loaderData?.venue.shortDescription || '',
    path: loaderData ? `/sites/${loaderData.venue.slug}` : '/sites',
  })
```

### Newsletter ("The Back Porch Dispatch")

Frontend signup form using `react-hook-form` + `zod` validation. Backend API at `/api/subscribe` is an app-owned TanStack server route and handles:
- Email validation (zod schema)
- Duplicate detection (per trail)
- D1 insertion into `subscribers` table with ULID IDs

**No external service required** — emails are stored directly in D1.

### Guides

Editorial **Guides** surface built for high-intent search and trip-planning traffic:
- `/guides` hub page for launch-ready planning content
- `/guides/$slug` detail pages with JSON-LD, breadcrumbs, and internal linking
- Launch set includes:
  - Weekend country music itinerary
  - Bristol Sessions history guide
  - Johnson City live roots music guide

Guide pages are defined in `src/logic/guides.ts` and rendered through reusable guide components in `src/components/guides/`.

### Route Preview Map

`/the-trail` uses `TrailRouteExperience` for a polished route-preview experience:
- Clickable regional hubs
- SVG route canvas
- Synced venue discovery panel
- Direct Google Maps handoff for hubs and lead stops

It is intentionally a map-like MVP built on current data. A true geospatial map layer can replace the SVG once venue coordinates are available.

### Error Handling & 404s

The router is configured with default components for all states:

```ts
const router = createTanStackRouter({
  routeTree,
  defaultPendingComponent: LoadingSpinner,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
})
```

Missing venue slugs and other not-found conditions use `throw notFound()` from `@tanstack/react-router`:

```ts
loader: async (loaderArgs) => {
  const venue = await getHolstonRoadVenueBySlug(getDbBinding(loaderArgs), loaderArgs.params.slug)
  if (!venue) throw notFound()
  return { venue }
}
```

### Venue Placeholder Images

All venue cards display `VenuePlaceholder` — a themed SVG placeholder with:
- Venue-type color coding (burgundy for major, walnut for affiliated, etc.)
- Geometric background patterns (seeded by venue name)
- Venue initials overlay

Swap in real photos by adding `imageUrl` values to venue data and updating components to render `<img>` when available.

### Audio Stories

The Stories page lists 5 audio stories with the `AudioPlayer` component. Each card shows:
- Play/pause button
- Progress bar and time display
- "Coming soon" badge when no audio URL is set

To publish audio, pass an `audioUrl` prop to `AudioPlayer` and the component will enable full playback.

---

## Deployment

### Prerequisites

- Cloudflare account
- Wrangler CLI authenticated (`npx wrangler login`)
- D1 database `trailhead-db` created and seeded with Holston Road data

### Steps

```bash
# Deploy (build + patch + deploy)
pnpm deploy

# Deploy with production canonical domain
VITE_SITE_URL=https://theholstonroad.codyboring.workers.dev pnpm deploy
```

Or manually:

```bash
pnpm build
node scripts/patch-worker-entry.js
npx wrangler deploy
```

### Post-Build Patch

The `scripts/patch-worker-entry.js` script **must run** between `vite build` and `wrangler deploy`. It is already included in the `deploy` npm script. Do not deploy without it — D1-dependent pages will 500.

---

## Brand Guidelines

| Element | Value |
|---------|-------|
| **Primary** | `#7c1d1d` (Burgundy) |
| **Secondary** | `#d97706` (Amber) |
| **Accent** | `#8c816e` (Walnut) |
| **Display Font** | Oswald |
| **Body Font** | Inter |
| **Tagline** | "The sound of the mountains." |
| **Secondary Tagline** | "The music never stopped." |

---

## Roadmap

### Phase 1: Foundation (Complete)
- [x] Homepage with music story preview
- [x] 5 music story chapters
- [x] Venue directory + detail pages
- [x] Events calendar
- [x] Content hub (Stories)
- [x] Newsletter signup with D1 backend
- [x] D1 database integration
- [x] Cloudflare env binding fix
- [x] Venue placeholder images
- [x] Audio player infrastructure
- [x] SEO — Open Graph, Twitter Cards, JSON-LD, canonical links, sitemap, robots.txt
- [x] Accessibility — Lighthouse 100/100/100 (A11y / Best Practices / SEO)
- [x] Error handling — NotFoundPage, ErrorPage, LoadingSpinner, `notFound()` pattern
- [x] TypeScript — zero errors on build
- [x] E2E test suite — Playwright coverage across all routes (Chromium, Firefox, WebKit, mobile)
- [x] Unit test infrastructure — Vitest + jsdom + React Testing Library

### Phase 2: Experience
- [ ] Real venue photography (replace SVG placeholders)
- [ ] Published audio stories (upload + stream)
- [x] Route-preview map experience MVP
- [x] SEO-ready guide pages for trip planning and history intent
- [x] Partner and regional proof surface
- [x] Stronger newsletter conversion surface
- [ ] True geospatial map layer (MapLibre GL or equivalent)
- [ ] Digital passport + check-ins
- [ ] Itinerary builder
- [ ] User accounts (better-auth)
- [ ] PWA + offline support

### Phase 3: Growth
- [ ] Membership tiers + Stripe
- [ ] Merchandise store
- [ ] Podcast feed
- [ ] Educational curriculum portal

---

## License

Proprietary. All rights reserved.

---

*Built for the Tri-Cities. The music never stopped.*
