# Deployment Guide

## Live URL

**Canonical production URL:** https://theholstonroad.org

**Workers runtime URL:** https://theholstonroad.codyboring.workers.dev

---

## Architecture Overview

The Holston Road deploys as a **Cloudflare Worker** using TanStack Start. A critical post-build patch ensures Cloudflare D1 bindings are accessible in TanStack Start loaders and server routes.

```
pnpm seo:generate
    ↓
vite build
    ↓
scripts/patch-worker-entry.js  ← REQUIRED
    ↓
wrangler deploy
```

**Do not skip the patch step.** Deploying without it causes `env.DB` to be undefined, resulting in 500 errors on every database-dependent page.

`pnpm seo:generate` rebuilds `public/robots.txt` and `public/sitemap.xml` from `src/lib/seo.ts`
before every production build. Those files are generated snapshots, not hand-maintained source
files.

### How the patch works

The `@cloudflare/vite-plugin` generates a virtual worker entry that does not pass `env` and `executionCtx` into TanStack Start's handler. The patch script (`scripts/patch-worker-entry.js`) modifies `dist/server/index.js` to:

1. Forward `env` and `executionCtx` to the TanStack Start handler as `{ context: { cloudflare: { env, ctx } } }`
2. Let app-owned TanStack server routes (including `src/routes/api/subscribe.ts`) read the D1 binding from that injected context

The patch is idempotent — running it twice is safe.

### How loaders receive the env

TanStack Start passes the Cloudflare context through as `serverContext` on loader arguments. This is **not** inside the `context` property. The working pattern is:

```ts
loader: async (loaderArgs) => {
  const db = getDbBinding(loaderArgs)  // Pass the full object
  const data = await getHolstonRoadData(db)
  return { data }
}
```

Do **not** destructure `context` from loader args. `loaderArgs.context` is `buildMatchContext()` and does not contain `cloudflare`.

---

## 1. Authenticate Wrangler

```bash
npx wrangler login
```

If you see `Authentication error [code: 10000]` or `Invalid access token`, re-run `npx wrangler login`.

---

## 2. Verify D1 Database

Ensure `trailhead-db` exists and contains Holston Road seed data:

```bash
npx wrangler d1 list
npx wrangler d1 execute trailhead-db --remote --command "SELECT name, slug FROM trails"
```

Expected output:
```
name                slug
------------------  ------------
The Holston Road    holston-road
```

If the trail is missing, re-run the seed script against the remote database.

---

## 3. Deploy

### Standard deploy (recommended)

```bash
pnpm deploy
```

This runs: `build` → `patch-worker-entry.js` → `wrangler deploy`

For the production canonical domain, run:

```bash
VITE_SITE_URL=https://theholstonroad.org pnpm deploy
```

### Manual deploy

```bash
pnpm build
node scripts/patch-worker-entry.js
npx wrangler deploy
```

---

## 4. Verify Deployment

### All pages

```bash
BASE="https://theholstonroad.codyboring.workers.dev"
for route in "" "the-trail" "sites" "sites/birthplace-of-country-music-museum" \
  "events" "stories" "about" "guides" "guides/bristol-sessions-guide" \
  "chapters/the-sound" "chapters/the-railroad" "chapters/the-sessions" \
  "chapters/the-festival" "chapters/the-next-generation"; do
  curl -s -o /dev/null -w "$route: %{http_code}\n" "$BASE/$route"
done
```

Expected: All routes return `200`.

### 404 handling

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://theholstonroad.codyboring.workers.dev/sites/nonexistent-venue"
```

Expected: `404` (handled by `NotFoundPage`, not a raw error).

### Database connectivity

```bash
curl -s https://theholstonroad.codyboring.workers.dev/the-trail | grep -o "Birthplace of Country Music Museum"
```

Should return the venue name, confirming D1 is connected.

### Newsletter API

```bash
curl -X POST https://theholstonroad.codyboring.workers.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected: `{"success":true,"alreadySubscribed":false}` (first time) or `{"success":true,"alreadySubscribed":true}` (duplicate).

### SEO elements

```bash
# Verify canonical link (should use the configured VITE_SITE_URL, not necessarily workers.dev)
curl -s https://theholstonroad.codyboring.workers.dev/the-trail | grep -o '<link rel="canonical"[^>]*>'

# Verify JSON-LD structured data
curl -s https://theholstonroad.codyboring.workers.dev | grep -o '<script type="application/ld+json">[^<]*</script>'

# Verify sitemap
curl -s -o /dev/null -w "%{http_code}\n" https://theholstonroad.codyboring.workers.dev/sitemap.xml

# Verify robots.txt
curl -s -o /dev/null -w "%{http_code}\n" https://theholstonroad.codyboring.workers.dev/robots.txt
```

`robots.txt` always disallows `/api/`, and `sitemap.xml` is generated from the
`STATIC_SITEMAP_ENTRIES` list in `src/lib/seo.ts`, which now includes the guides hub and shipped
guide pages.

---

## 5. Custom Domain

After first deploy:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → `theholstonroad`
3. Settings → Domains & Routes
4. Add custom domain (e.g., `theholstonroad.org`)
5. Rebuild with `VITE_SITE_URL=https://your-domain.com pnpm build` so canonicals, JSON-LD,
   `robots.txt`, and `sitemap.xml` all use the production domain. Set the same variable in CI so
   automated deploys generate matching SEO assets.

---

## 6. Environment Variables

For Phase 2+ features, set secrets via Wrangler:

```bash
# Stripe (memberships + merch)
wrangler secret put STRIPE_SECRET_KEY

# better-auth (session secret)
wrangler secret put BETTER_AUTH_SECRET
```

**Note:** The newsletter backend does **not** require an external API key. `POST /api/subscribe` is implemented as an app-owned TanStack server route and writes directly to the shared D1 database.

---

## 7. Database Operations

### Execute SQL on remote D1

```bash
npx wrangler d1 execute trailhead-db --remote --command "SELECT * FROM venues WHERE trail_id = (SELECT id FROM trails WHERE slug = 'holston-road')"
```

### Check subscribers

```bash
npx wrangler d1 execute trailhead-db --remote --command "SELECT email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 10"
```

### Add a new table (no migrations set up)

This project does not use Drizzle Kit migrations. Apply schema changes with raw SQL:

```bash
npx wrangler d1 execute trailhead-db --remote --command "CREATE TABLE IF NOT EXISTS new_table (...)"
```

Update `src/db/schema.ts` and `src/db/queries.ts` to match.

---

## Rollback

If a deployment breaks, rollback to the previous version:

```bash
npx wrangler rollback --name theholstonroad
```

---

## Monitoring

View logs and metrics in the Cloudflare dashboard:
- Workers & Pages → `theholstonroad` → Analytics
- Real-time logs: `npx wrangler tail`

---

## Troubleshooting

### `D1 database binding 'DB' not found`

The post-build patch did not run or failed. Rebuild and patch:

```bash
pnpm build
node scripts/patch-worker-entry.js
npx wrangler deploy
```

### `Cannot read properties of undefined (reading 'env')`

Same root cause — `serverContext.cloudflare` is undefined. Verify the patch is present in `dist/server/index.js`:

```bash
grep "cloudflare: { env, ctx: executionCtx }" dist/server/index.js
```

If missing, re-run `node scripts/patch-worker-entry.js`.

### Loader destructuring bug

If you see 500s after code changes that touched a DB route, check that the loader **passes the full `loaderArgs` object** to `getDbBinding()`:

```ts
// ✅ Correct
loader: async (loaderArgs) => {
  const db = getDbBinding(loaderArgs)
}

// ❌ Wrong — context does not contain cloudflare
loader: async ({ context }) => {
  const db = getDbBinding(context)
}
```

### `Authentication error [code: 10000]`

Wrangler token expired. Re-authenticate:

```bash
npx wrangler login
```

### Build failures

TanStack packages are pinned to `"latest"` in `package.json`. If a build fails after `pnpm install`, check for version drift:

```bash
pnpm list @tanstack/react-start @tanstack/react-router
```

If versions jumped, consult the TanStack Start changelog for breaking changes. Lock versions in `package.json` if needed.

### Wrangler uses wrong config

The `@cloudflare/vite-plugin` generates `dist/server/wrangler.json` during build. Wrangler uses this generated file instead of the source `wrangler.jsonc`. The generated file should include the `DB` binding. If it doesn't, the deploy will fail even though the source config is correct.

### GitHub Actions deploys skip the patch

Running `wrangler deploy` directly after `pnpm build` is not enough. CI must also run
`pnpm patch-worker` (or `node scripts/patch-worker-entry.js`) because the patch is not part of
Wrangler's deploy command.
