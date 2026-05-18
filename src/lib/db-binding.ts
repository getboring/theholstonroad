/**
 * Helper to get the D1 database binding from the TanStack Start loader params.
 *
 * The post-build patch (scripts/patch-worker-entry.js) injects the Cloudflare
 * env as request context. TanStack Start exposes this as a top-level
 * `serverContext` property on the loader params object:
 *
 *   params.serverContext.cloudflare.env.DB
 *
 * We also fall back to params.context.cloudflare.env.DB in case the
 * framework's context shape changes between versions.
 */
export function getDbBinding(params: unknown): D1Database {
	const serverContext = (params as any)?.serverContext;
	if (serverContext?.cloudflare?.env?.DB) {
		return serverContext.cloudflare.env.DB as D1Database;
	}

	const routeContext = (params as any)?.context;
	if (routeContext?.cloudflare?.env?.DB) {
		return routeContext.cloudflare.env.DB as D1Database;
	}

	const prodEnv = (process as any).env;
	if (prodEnv?.DB) {
		return prodEnv.DB as D1Database;
	}

	throw new Error(
		"D1 database binding 'DB' not found. Make sure it's configured in wrangler.jsonc.",
	);
}
