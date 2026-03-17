import { expect, test } from '@playwright/test'

test('merges realtime feed items and updates filtered lanes', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Following' }).click()
  await expect(page.locator('[data-feed-id="post-1"]')).toBeVisible()
  await expect(page.locator('[data-feed-id="post-2"]')).toHaveCount(0)

  await page.getByRole('button', { name: 'Live Now' }).click()
  await expect(page.locator('[data-feed-id="post-live-1"]')).toBeVisible()
  await expect(page.getByText('Live now: creator fundraiser spikes into the top watchlist lane')).toBeVisible()
})
