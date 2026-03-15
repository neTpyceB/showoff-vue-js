import { expect, test } from '@playwright/test'

test('authenticates, creates article, and filters by tag', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('dev@kb.local')
  await page.getByLabel('Password').fill('devpass')
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.locator('body')).toContainText('Knowledge Base', { timeout: 15000 })

  await page.getByLabel('Title').fill('REST client tips')
  await page.getByLabel('Tags').fill('api, testing')
  await page.getByLabel('Markdown').fill('# Notes\nUse typed API wrappers.')
  await page.getByRole('button', { name: 'Publish' }).click()

  await page.getByLabel('Search').fill('REST client tips')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.locator('body')).toContainText('REST client tips')

  await page.getByRole('button', { name: 'api' }).click()
  await expect(page.locator('body')).toContainText('REST client tips')
})
