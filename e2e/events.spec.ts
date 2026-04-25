import { test, expect } from '@playwright/test'

test.describe('Events', () => {
  test('events page has correct structure', async ({ page }) => {
    await page.goto('/events')
    await expect(page.locator('h1')).toBeVisible()
  })
})
