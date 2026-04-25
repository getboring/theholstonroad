import { test, expect } from '@playwright/test'

test.describe('Guides', () => {
  test('guides hub page has heading', async ({ page }) => {
    await page.goto('/guides')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('guide detail page has heading', async ({ page }) => {
    await page.goto('/guides/weekend-itinerary')
    await expect(page.locator('h1')).toBeVisible()
  })
})
