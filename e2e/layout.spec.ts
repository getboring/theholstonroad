import { test, expect } from '@playwright/test'

const routes = ['/', '/about', '/stories', '/guides', '/sites', '/events']

test.describe('Layout', () => {
  for (const route of routes) {
    test(`header and footer are present at ${route}`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()
    })
  }

  test('footer contains expected links', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.getByRole('link', { name: /Guides/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /The Trail/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /Venues/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /Events/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /Stories/i })).toBeVisible()
  })
})
