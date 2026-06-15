# AGENTS.md — The Holston Road

Agent-focused instructions for this codebase. For human contributors, see README.md.

---

## Project Identity

The Holston Road is a music heritage trail for Northeast Tennessee (Tri-Cities: Bristol, Kingsport, Johnson City). It connects venues, festivals, and stories from the 1927 Bristol Sessions to today's live music scene. It reads from a shared Cloudflare D1 database (`trailhead-db`) with the Trailhead project.

---

## Stack & Key Dependencies

- **Framework:** TanStack Start (full-stack React, file-based routing)
- **Build:** Vite 8 + `@cloudflare/vite-plugin`
- **Styling:** Tailwind CSS v4 + custom OKLCH brand colors in `src/lib/colors.ts`
- **Database:** Cloudflare D1 (SQLite), shared with Trailhead
- **ORM:** Drizzle ORM (schema in `src/db/schema.ts`)
- **Hosting:** Cloudflare Workers
- **E2E:** Playwright (Chromium, Firefox, WebKit, mobile Chrome/Safari)
- **Unit:** Vitest + jsdom + React Testing Library
- **Package Manager:** pnpm
- **TypeScript:** Strict mode, zero errors on build

---

## File Organization

```
src/
  routes/           # File-based routing. __root.tsx is the root layout.
  components/       # Shared UI. Subdirectories for grouped components (e.g., guides/).
  db/               # Schema, queries, seeds. Shared with Trailhead project.
  lib/              # Utilities: db-binding.ts, colors.ts, seo.ts
  logic/            # Business logic + content data (not components)
  router.tsx        # Router config with default Pending/NotFound/Error components
  styles.css        # Tailwind + custom fonts
scripts/            # Post-build patch + SEO asset generation
public/             # Static assets (favicon, robots.txt, sitemap.xml — all generated)
e2e/                # Playwright tests (8 spec files)
```

---

## Critical: Cloudflare Env Binding

This is the single most important thing to understand. **TanStack Start's `@cloudflare/vite-plugin` does NOT reliably pass `env` to route loaders in production.** The built worker entry does not forward `env` and `ctx` to the TanStack Start handler.

### The working pattern

```ts
import { getDbBinding } from "~/lib/db-binding"

// ✅ CORRECT: Pass the full loaderArgs object
loader: async (loaderArgs) => {
  const db = getDbBinding(loaderArgs)
  const data = await getHolstonRoadData(db)
  return { data }
}

// ❌ WRONG: context does not contain cloudflare
loader: async ({ context }) => {
  const db = getDbBinding(context)
}
```

The `serverContext` is available on the **full** `loaderArgs` object. `loaderArgs.context` is `buildMatchContext()` and does not contain `cloudflare`.

The `getDbBinding()` helper in `src/lib/db-binding.ts` checks multiple paths defensively:
1. `loaderArgs.serverContext.cloudflare.env.DB`
2. `loaderArgs.context.cloudflare.env.DB` (fallback)
3. `process.env.DB` (fallback)

### API routes (different pattern)

App-owned API routes use `server.handlers.POST({ context, request })` where `context` MAY contain `cloudflare`. The newsletter route at `src/routes/api/subscribe.ts` reads from this context.

### Post-build patch

The `scripts/patch-worker-entry.js` script modifies `dist/server/index.js` to inject `{ context: { cloudflare: { env, ctx } } }` into the TanStack Start handler. This script **must run** between `vite build` and `wrangler deploy`.

It is included in the `deploy` npm script: `npm run build && node scripts/patch-worker-entry.js && wrangler deploy`

The patch is idempotent. Do not deploy without it — DB-dependent pages will 500.

---

## Route Conventions

### Loader arguments

Always pass the **full** `loaderArgs` object to `getDbBinding()`. Never destructure `context` from it.

```ts
// ✅ Correct
loader: async (loaderArgs) => {
  const db = getDbBinding(loaderArgs)
  return { data }
}
```

### Error handling

Use TanStack Router's `notFound()` for missing resources:

```ts
import { notFound } from "@tanstack/react-router"

loader: async (loaderArgs) => {
  const data = await getData(getDbBinding(loaderArgs))
  if (!data) throw notFound()
  return { data }
}
```

The router is configured with `defaultNotFoundComponent: NotFoundPage`, so `notFound()` renders the branded 404 page.

### Head/meta

Every route implements `head` for SEO. Use `createPageHead()` from `src/lib/seo.ts`:

```ts
head: () =>
  createPageHead({
    title: "Page Title — The Holston Road",
    description: "Page description",
    path: "/route-path",
  })
```

Dynamic routes build canonical URLs from `loaderData`:

```ts
head: ({ loaderData }) =>
  createPageHead({
    title: loaderData ? `${loaderData.venue.name} — The Holston Road` : "Site",
    description: loaderData?.venue.shortDescription || "",
    path: loaderData ? `/sites/${loaderData.venue.slug}` : "/sites",
  })
```

---

## Database Conventions

### Schema

- All IDs are **ULID** (via `ulidx`), never auto-increment or UUID v4
- All tables have `created_at` and `updated_at` timestamps
- `trail_id` is a foreign key to `trails.id` for trail-scoped tables
- Foreign keys are always enforced (D1 default)
- JSON data stored as TEXT (D1 does not have native JSON type)
- No native BOOLEAN — use INTEGER (0/1)
- No native DATETIME — use INTEGER (Unix timestamp)

### Queries

Holston Road-specific queries live in `src/db/queries.ts`. They are thin wrappers around Drizzle
queries scoped to `trail_id = holston-road` (or equivalent filter). Query functions receive a
`D1Database` binding and return the relevant data. Keep query logic here, not in routes.

### Adding a table

1. Add the table to `src/db/schema.ts`
2. Add type exports at the bottom of `schema.ts`
3. Add query helpers to `src/db/queries.ts`
4. Apply schema changes to remote D1 with raw SQL (no migration system):
   ```bash
   npx wrangler d1 execute trailhead-db --remote --command "CREATE TABLE ..."
   ```

---

## Component Conventions

### Styling

- Tailwind CSS v4, all custom colors defined in `src/lib/colors.ts` using OKLCH
- Brand colors: Burgundy `#7c1d1d`, Amber `#d97706`, Walnut `#8c816e`
- Font: Oswald (display) + Inter (body)
- Custom theme configuration in `src/styles.css`

### Accessibility

- All `<img>` elements need `alt` text
- Forms need `label` elements (or `aria-label`) and error messages with `aria-describedby`
- Interactive elements need focus states
- Color contrast must meet WCAG AA
- Mobile menu uses `<details>` element with `aria-label` on `<summary>`

### Form handling

- Use `react-hook-form` + `zod` resolvers for client-side forms
- Cross-browser compatibility: avoid `type="email" required` — use `type="text" inputMode="email"` with zod validation instead (WebKit/Safari native validation causes Playwright automation issues)
- ARIA: `aria-invalid`, `aria-describedby` linking help + error text

### Hydration safety

- `<details>` elements need explicit `open={false}` to prevent server/client hydration mismatch
- Client-only code should guard with `typeof window !== "undefined"` or use `useEffect` with an initial state

---

## Testing Conventions

### Unit tests

- Files: `src/**/*.test.{ts,tsx}`
- Run: `pnpm test`
- Framework: Vitest + jsdom + React Testing Library
- Use `tsconfigPaths` for `#/*` alias support

### E2E tests

- Files: `e2e/*.spec.ts`
- Run: `pnpm test:e2e`
- Framework: Playwright with 5 projects (Chromium/Firefox/WebKit desktop + Chrome/Safari mobile)
- Web server: starts automatically via `webServer` config

**Important rules:**
- Desktop nav visibility tests must skip when viewport width < 768px
- Newsletter validation tests must skip on WebKit (known Playwright automation quirk with React synthetic events)
- Use `scrollIntoViewIfNeeded()` before clicking elements that may be off-screen on mobile
- DB routes are tested leniently (h1 visible check) because D1 bindings may not be injectable in local dev mode

### Adding a new route

When adding a new route:
1. Add navigation tests in `e2e/navigation.spec.ts`
2. Add accessibility test in `e2e/accessibility.spec.ts`
3. If it loads data, add layout test in `e2e/layout.spec.ts`
4. If it has special functionality, add a new spec file or expand existing one

---

## Build & Deploy

### Standard deploy

```bash
pnpm deploy    # builds, patches, and deploys
```

### With explicit canonical URL

```bash
VITE_SITE_URL=https://theholstonroad.codyboring.workers.dev pnpm deploy
```

### CI / GitHub Actions

The `.github/workflows/deploy.yml` runs: build → patch-worker → deploy.

Do NOT run `wrangler deploy` directly without the patch step. The generated `dist/server/index.js`
must be patched first.

---

## SEO & Content

- Canonical URL is centralized in `src/lib/seo.ts` — single source of truth
- `pnpm seo:generate` rebuilds `public/robots.txt` and `public/sitemap.xml` before every build
- Do not hand-edit `public/robots.txt` or `public/sitemap.xml`
- JSON-LD structured data uses `TouristAttraction` schema on root route
- Every route should have `head` with title, description, and canonical path
- Open Graph and Twitter Card meta tags are generated automatically by `createPageHead()`
- When adding new crawlable routes, update `STATIC_SITEMAP_ENTRIES` in `src/lib/seo.ts`

---

## Money & IDs

- **Money:** Always INTEGER cents. Never floating point.
- **IDs:** Always ULID via `ulidx`. Never auto-increment, never UUID v4.
- **Dates:** `date-fns` for formatting, INTEGER (Unix timestamp) for storage.

---

## Debugging Order

When something breaks: auth → cache → network → data → code

1. Is Wrangler authenticated? (`npx wrangler login`)
2. Is the D1 database accessible? (`npx wrangler d1 list`)
3. Is the post-build patch applied? (`grep "cloudflare: { env" dist/server/index.js`)
4. Is the loader passing full `loaderArgs` to `getDbBinding()`?
5. Check the code.

---

## Common Gotchas

1. **D1 in dev mode** — D1 bindings may not be injectable locally. DB routes frequently 500 in `pnpm dev` but work fine in production. Test DB routes via `pnpm preview` or deploy to staging.

2. **TanStack Start version drift** — Packages are pinned to `"latest"`. If build fails after `pnpm install`, check for version jumps in `@tanstack/react-start` or `@tanstack/react-router`.

3. **Generated wrangler.json** — The `@cloudflare/vite-plugin` generates `dist/server/wrangler.json` during build. Wrangler uses this generated file, not the source `wrangler.jsonc`. If the generated file is missing the `DB` binding, deploy will fail.

4. **Newsletter form on WebKit** — Safari's native email validation prevents React synthetic events in Playwright. The form uses `type="text" inputMode="email"` with zod validation for cross-browser compatibility. Real Safari users are unaffected.

5. **Mobile viewport tests** — The desktop nav is hidden on mobile. Any test checking desktop nav visibility must skip when `viewport.width < 768`.

6. **Hydration mismatch on `<details>`** — Always add `open={false}` to `<details>` elements used as dropdown menus to prevent server/client hydration mismatch.

---

## Code Style

- TypeScript strict mode, zero errors on build
- Biome for linting and formatting
- No floating promises — always `await` or `.catch()`
- No `console.log` in production code (use sparingly in dev, remove before commit)
- No em-dashes in copy (use en-dash or hyphen)
- Use `Result<T>` pattern in `packages/core/` (returns, never throws) — for this project, prefer `throw` for route errors and `notFound()` for missing resources

---

## Emergency Contacts

If the site is down after deploy:
1. Check Cloudflare Workers dashboard for error rates
2. Run `npx wrangler tail` to see real-time logs
3. Check that `dist/server/index.js` contains the patch (grep for `cloudflare: { env`)
4. Rollback: `npx wrangler rollback --name theholstonroad`
