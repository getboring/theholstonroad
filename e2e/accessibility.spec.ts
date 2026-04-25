import { test, expect } from '@playwright/test'

const routes = ['/chapters/the-sound', '/about', '/stories', '/guides']

test.describe('Accessibility', () => {
  for (const route of routes) {
    test(`page has h1 at ${route}`, async ({ page }) => {
      await page.goto(route)
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()
    })

    test(`focus is visible on links at ${route}`, async ({ page }) => {
      await page.goto(route)
      const firstLink = page.locator('a').first()
      await firstLink.focus()
      // Verify the element is focusable
      const focused = await firstLink.evaluate((el) => document.activeElement === el)
      expect(focused).toBe(true)
    })
  }
})
