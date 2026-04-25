import { test, expect } from '@playwright/test'

test.describe('Venues', () => {
  test('venue directory page structure is correct', async ({ page }) => {
    await page.goto('/sites')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('venue detail page structure is correct for known slug', async ({ page }) => {
    await page.goto('/sites/birthplace-of-country-music-museum')
    await expect(page.locator('h1')).toBeVisible()
  })
})
