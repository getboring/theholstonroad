import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		// Match the app build so #/* imports work in Vitest without extra alias setup.
		tsconfigPaths: true,
	},
	test: {
		// React Testing Library needs a DOM-like environment. This avoids document/window undefined
		// failures when we add route and component tests.
		environment: 'jsdom',
		globals: true,
		// Keep CI green until the first test files land.
		passWithNoTests: true,
		// Ignore built output so Vitest does not discover generated server/client bundles.
		exclude: ['dist/**', 'node_modules/**'],
	},
})
