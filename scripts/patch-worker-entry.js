#!/usr/bin/env node
/**
 * Post-build patch for Cloudflare Workers virtual entry.
 * The @cloudflare/vite-plugin generates a virtual worker entry that doesn't
 * pass Cloudflare env/bindings through to TanStack Start's router context.
 * This patch replaces the default wrapper with one that injects
 * { context: { cloudflare: { env, ctx } } } so route loaders can access D1.
 * The newsletter write path now lives in src/routes/api/subscribe.ts.
 */

import fs from "node:fs"

const INDEX_PATH = "dist/server/index.js"

if (!fs.existsSync(INDEX_PATH)) {
  console.error(`❌ ${INDEX_PATH} not found. Run build first.`)
  process.exit(1)
}

let content = fs.readFileSync(INDEX_PATH, "utf-8")

const ORIGINAL = "var worker_entry_default = createServerEntry({ fetch: fetch$1 }) ?? {};"
const PATCHED = `var worker_entry_default = { async fetch(request, env, executionCtx) {
  return fetch$1(request, { context: { cloudflare: { env, ctx: executionCtx } } });
} };`

if (!content.includes(ORIGINAL)) {
  // Already patched or structure changed
  if (content.includes(PATCHED.slice(0, 50))) {
    console.log("✅ Worker entry already patched.")
    process.exit(0)
  }
  console.error("❌ Could not find the expected worker entry pattern to patch.")
  console.error("   The build output may have changed. Manual review needed.")
  process.exit(1)
}

content = content.replace(ORIGINAL, PATCHED)
fs.writeFileSync(INDEX_PATH, content)
console.log("✅ Patched Cloudflare worker entry to pass env bindings.")
