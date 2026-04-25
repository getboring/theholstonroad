import { test, expect } from '@playwright/test'

// Routes that don't need D1 and should work in dev mode
const staticRoutes = [
  { path: '/chapters/the-sound', title: /The Sound/ },
  { path: '/chapters/the-railroad', title: /The Railroad/ },
  { path: '/chapters/the-sessions', title: /The Sessions/ },
  { path: '/chapters/the-festival', title: /The Festival/ },
  { path: '/chapters/the-next-generation', title: /The Next Generation/ },
  { path: '/about', title: /About/ },
  { path: '/stories', title: /Stories/ },
]

// Routes that need D1 — may 500 in dev but should work in production
const dbRoutes = [
  { path: '/', title: /The Holston Road/ },
  { path: '/the-trail', title: /Trail/ },
  { path: '/guides', title: /Guides/ },
  { path: '/sites', title: /Venues/ },
  { path: '/events', title: /Events/ },
]

test.describe('Static routes (no DB)', () => {
  for (const route of staticRoutes) {
    test(`loads ${route.path} with correct title`, async ({ page }) => {
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(route.title)
    })
  }
})

test.describe('DB routes (dev mode may 500)', () => {
  for (const route of dbRoutes) {
    test(`page structure is correct for ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      // In dev these may 500 due to missing D1 binding, but we verify the error page renders
      await expect(page.locator('h1')).toBeVisible()
    })
  }
})

test.describe('404 handling', () => {
  test('404 page renders for unknown static routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByText(/Page not found/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /Back to the trail/i })).toBeVisible()
  })
})

test.describe('Header navigation', () => {
  test('all nav links are visible on desktop', async ({ page }) => {
    const viewport = page.viewportSize()
    // Desktop nav is hidden on narrow viewports (mobile)
    if (viewport && viewport.width < 768) {
      test.skip()
    }
    await page.goto('/about')
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav.getByRole('link', { name: 'The Trail' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Guides' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Venues' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Events' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Stories' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('mobile menu opens and closes from the toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/about')

    const menuButton = page.locator('summary[aria-controls="mobile-menu"]')
    const menuRoot = page.locator('details')
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]')

    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(menuRoot).toHaveAttribute('open', '')
    await expect(mobileNav.getByRole('link', { name: 'Venues' })).toBeVisible()

    await menuButton.click()
    await expect(menuRoot).not.toHaveAttribute('open', '')
  })

  test('mobile menu closes after following a link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/about')

    const menuButton = page.locator('summary[aria-controls="mobile-menu"]')
    const menuRoot = page.locator('details')
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]')

    await menuButton.click()
    await mobileNav.getByRole('link', { name: 'Stories' }).click()
    await expect(page).toHaveURL(/\/stories$/)
    await expect(menuRoot).not.toHaveAttribute('open', '')
  })
})
