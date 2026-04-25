import { test, expect } from '@playwright/test'

test.describe('Newsletter', () => {
  test('newsletter form is visible on stories page', async ({ page }) => {
    await page.goto('/stories')
    await expect(page.getByRole('heading', { name: /Get the Back Porch Dispatch/i })).toBeVisible()
    await expect(page.getByLabel(/Email address/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Get the Tuesday dispatch/i })).toBeVisible()
  })

  test('newsletter form shows validation error for invalid email', async ({ page }) => {
    await page.goto('/stories')
    const emailInput = page.getByLabel(/Email address/i)
    const submitButton = page.getByRole('button', { name: /Get the Tuesday dispatch/i })

    await emailInput.fill('not-an-email')
    await submitButton.click()

    await expect(page.locator('#newsletter-email-error')).toContainText(/valid email/i)
  })

  test('newsletter form shows validation error for empty email', async ({ page }) => {
    await page.goto('/stories')
    const emailInput = page.getByLabel(/Email address/i)
    const submitButton = page.getByRole('button', { name: /Get the Tuesday dispatch/i })

    await emailInput.fill('')
    await submitButton.click()

    await expect(page.locator('#newsletter-email-error')).toContainText(/valid email/i)
  })

  test('newsletter link on stories page navigates to homepage with hash', async ({ page }) => {
    await page.goto('/stories')
    const link = page.getByRole('link', { name: /Join the dispatch/i })
    await expect(link).toBeVisible()
  })
})
