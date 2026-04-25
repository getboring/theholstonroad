import { getDbBinding } from './db-binding'

const originalEnv = process.env

function setProcessEnv(nextEnv: Record<string, unknown>): void {
	Object.defineProperty(process, 'env', {
		value: nextEnv,
		configurable: true,
	})
}

describe('getDbBinding', () => {
	afterEach(() => {
		setProcessEnv(originalEnv)
	})

	it('prefers the serverContext Cloudflare DB binding', () => {
		const serverDb = { source: 'server' } as unknown as D1Database
		const routeDb = { source: 'route' } as unknown as D1Database

		const result = getDbBinding({
			serverContext: { cloudflare: { env: { DB: serverDb } } },
			context: { cloudflare: { env: { DB: routeDb } } },
		})

		expect(result).toBe(serverDb)
	})

	it('falls back to the route context binding and then process.env.DB', () => {
		const routeDb = { source: 'route' } as unknown as D1Database
		expect(
			getDbBinding({
				context: { cloudflare: { env: { DB: routeDb } } },
			}),
		).toBe(routeDb)

		const envDb = { source: 'env' } as unknown as D1Database
		setProcessEnv({ ...originalEnv, DB: envDb })

		expect(getDbBinding({})).toBe(envDb)
	})

	it('throws a helpful error when no binding is available', () => {
		setProcessEnv({ ...originalEnv, DB: undefined })

		expect(() => getDbBinding({})).toThrow(
			"D1 database binding 'DB' not found. Make sure it's configured in wrangler.jsonc.",
		)
	})
})
