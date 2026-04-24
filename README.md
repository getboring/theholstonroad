# The Holston Road

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare-orange.svg)](https://workers.cloudflare.com)
[![Stack](https://img.shields.io/badge/Stack-TanStack%20Start%20%2B%20Cloudflare-blue.svg)](https://tanstack.com/start)

> A trail through America's First Frontier — from the Holston River to the Old Stage Road, from the Watauga Association to the Overmountain Men. **We didn't wait for permission.**

**Live Site:** [theholstonroad.org](https://theholstonroad.org)

---

## What This Is

The Holston Road is a **standalone heritage trail product** for the Tri-Cities region of Northeast Tennessee (Bristol, Kingsport, Johnson City). It is a digitally-powered driving trail connecting 10-12 historical sites, experienced through:

- A mobile-first website with interactive storytelling
- Five narrative chapters (The River, The Road, The Agreement, The March, The State)
- An events calendar tied to living history and regional festivals
- A site directory with detailed venue pages
- A content hub for audio stories, articles, and documentary material

**This is not connected to The Crooked Road.** Separate brand, separate codebase, separate identity.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | TanStack Start (full-stack React, SSR) |
| **Styling** | Tailwind CSS v4 |
| **Database** | Cloudflare D1 (SQLite) |
| **ORM** | Drizzle ORM |
| **Auth** | better-auth (ready for Phase 2) |
| **Hosting** | Cloudflare Workers + Pages |
| **Maps** | MapLibre GL + OpenStreetMap |

---

## Project Structure

```
├── src/
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── index.tsx        # Homepage
│   │   ├── about.tsx        # Mission + story
│   │   ├── the-trail.tsx    # Trail overview + route
│   │   ├── events.tsx       # Event calendar
│   │   ├── stories.tsx      # Content hub
│   │   ├── chapters/        # 5 narrative chapter pages
│   │   │   ├── the-river.tsx
│   │   │   ├── the-road.tsx
│   │   │   ├── the-agreement.tsx
│   │   │   ├── the-march.tsx
│   │   │   └── the-state.tsx
│   │   └── sites/           # Venue directory + detail
│   │       ├── index.tsx
│   │       └── $slug.tsx
│   ├── components/          # Shared UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── NewsletterSignup.tsx
│   ├── db/                  # Database schema + queries
│   │   ├── schema.ts        # Drizzle schema (shared with Trailhead)
│   │   └── queries.ts       # Holston Road-specific queries
│   ├── lib/                 # Utilities
│   │   └── colors.ts        # Brand color system
│   └── styles.css           # Tailwind + custom fonts
├── docs/                    # Planning documents
├── public/                  # Static assets
├── wrangler.jsonc           # Cloudflare config
├── vite.config.ts           # Vite + TanStack Start
└── package.json
```

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run local dev server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

---

## Database

This project reads from the **Trailhead D1 database** (`trailhead-db`). The Holston Road is stored as `slug = "holston-road"` in the `trails` table, with related venues, events, and waysides scoped by `trail_id`.

### Local Development

The local D1 database is auto-detected from `.wrangler/state/v3/d1/`. Seed data is managed via the Trailhead seed runner.

### Schema

See `src/db/schema.ts` for full table definitions. Key tables:
- `trails` — trail metadata, colors, branding
- `venues` — historic sites (anchor, road-stop, present-site, river-site)
- `events` — recurring and special events
- `waysides` — narrative wayside exhibit content
- `dmo_contacts` — regional tourism office contacts

---

## Deployment

### Prerequisites

- Cloudflare account
- Wrangler CLI authenticated (`wrangler login`)
- D1 database `trailhead-db` created and seeded

### Steps

1. **Update `wrangler.jsonc`** with your account details
2. **Set secrets** (if needed for Phase 2 features):
   ```bash
   wrangler secret put STRIPE_SECRET_KEY
   wrangler secret put CONVERTKIT_API_KEY
   ```
3. **Deploy**:
   ```bash
   pnpm deploy
   ```

### Custom Domain

Add a custom domain in the Cloudflare dashboard:
1. Workers & Pages → `theholstonroad` → Settings → Domains & Routes
2. Add `theholstonroad.org`

---

## Brand Guidelines

| Element | Value |
|---------|-------|
| **Primary** | `#1a472a` (River Green) |
| **Secondary** | `#c45c1a` (Forge Orange) |
| **Accent** | `#78716c` (Limestone) |
| **Display Font** | Oswald |
| **Body Font** | Inter |
| **Tagline** | "We didn't wait for permission." |
| **Secondary Tagline** | "Where the frontier still works." |

---

## Roadmap

### Phase 1: Foundation (Complete)
- [x] Homepage with chapter preview
- [x] 5 chapter narrative pages
- [x] Site directory + detail pages
- [x] Events calendar
- [x] Content hub (Stories)
- [x] Newsletter signup
- [x] D1 database integration

### Phase 2: Experience
- [ ] Interactive MapLibre map
- [ ] Digital passport + check-ins
- [ ] Itinerary builder
- [ ] User accounts (better-auth)
- [ ] PWA + offline support

### Phase 3: Growth
- [ ] Membership tiers + Stripe
- [ ] Merchandise store
- [ ] Audio story player
- [ ] Podcast feed
- [ ] Educational curriculum portal

---

## License

Proprietary. All rights reserved.

---

*Built for the Tri-Cities. Stewarded by Rocky Mount State Historic Site.*
