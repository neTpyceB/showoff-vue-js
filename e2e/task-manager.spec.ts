import { expect, test } from '@playwright/test'

test('creates, toggles, removes task and persists after reload', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Interactive Task Manager' })).toBeVisible()

  await page.getByPlaceholder('Add task').fill('Prepare demo')
  await page.getByRole('button', { name: 'Add' }).click()
  await expect(page.getByText('Prepare demo')).toBeVisible()

  await page.getByRole('checkbox').check()
  await expect(page.getByText('0 active / 1 total')).toBeVisible()

  await page.reload()
  await expect(page.getByText('Prepare demo')).toBeVisible()

  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByText('No tasks yet.')).toBeVisible()
})
