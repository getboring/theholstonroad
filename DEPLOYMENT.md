# Deployment Guide

## Cloudflare Workers Deployment

### 1. Authenticate Wrangler

```bash
npx wrangler login
```

### 2. Verify D1 Database

Ensure `trailhead-db` exists and contains Holston Road seed data:

```bash
npx wrangler d1 list
npx wrangler d1 execute trailhead-db --command "SELECT name, slug FROM trails"
```

Expected output:
```
name                slug
------------------  ------------
The Holston Road    holston-road
```

### 3. Configure Wrangler

The `wrangler.jsonc` is pre-configured. Update if needed:

```jsonc
{
  "name": "theholstonroad",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "trailhead-db",
      "database_id": "YOUR-DATABASE-ID",
      "migrations_dir": "drizzle"
    }
  ]
}
```

### 4. Deploy

```bash
pnpm build
pnpm deploy
```

Or combined:
```bash
pnpm run deploy
```

### 5. Custom Domain

After first deploy:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → `theholstonroad`
3. Settings → Domains & Routes
4. Add custom domain: `theholstonroad.org`

### 6. Environment Variables

For Phase 2+ features, set secrets:

```bash
# Stripe (memberships + merch)
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_PUBLISHABLE_KEY

# ConvertKit (newsletter)
wrangler secret put CONVERTKIT_API_KEY

# better-auth (session secret)
wrangler secret put BETTER_AUTH_SECRET
```

### 7. Verify Deployment

```bash
# Check Worker is running
curl https://theholstonroad.YOUR_SUBDOMAIN.workers.dev/

# Check database connectivity
curl https://theholstonroad.YOUR_SUBDOMAIN.workers.dev/the-trail
```

---

## Rollback

If a deployment breaks, rollback to the previous version:

```bash
wrangler rollback --name theholstonroad
```

---

## Monitoring

View logs and metrics in the Cloudflare dashboard:
- Workers & Pages → `theholstonroad` → Analytics
- Real-time logs: `wrangler tail`
