import { expect, test } from '@playwright/test'

test('loads tenant modules dynamically and enforces tenant permissions', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('owner@saas.local')
  await page.getByLabel('Password').fill('ownerpass')
  await page.getByRole('button', { name: 'Access platform' }).click()

  await expect(page.getByRole('heading', { name: 'Acme Industries' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Billing Ops' })).toBeVisible()

  await page.getByRole('link', { name: 'Billing Ops' }).click()
  await page.getByRole('button', { name: 'Run reconciliation' }).click()
  await expect(page.getByText('ran run reconciliation')).toBeVisible()

  await page.getByLabel('Tenant').selectOption('globex')
  await expect(page.getByRole('heading', { name: 'Globex Labs' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'CRM Sync' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Billing Ops' })).toHaveCount(0)

  await page.getByRole('link', { name: 'CRM Sync' }).click()
  await expect(page.getByRole('button', { name: 'Sync contacts' })).toBeDisabled()
})
