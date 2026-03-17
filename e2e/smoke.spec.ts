import { expect, test } from '@playwright/test'

test('renders the SSR homepage shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'PulseLine' })).toBeVisible()
  await expect(page.locator('[data-feed-id="post-1"]')).toBeVisible()
})
