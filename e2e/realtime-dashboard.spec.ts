import { expect, test } from '@playwright/test'

test('shared updates and notifications across roles', async ({ browser }) => {
  const editor = await browser.newContext()
  const viewer = await browser.newContext()
  const editorPage = await editor.newPage()
  const viewerPage = await viewer.newPage()

  await editorPage.goto('/login')
  await editorPage.getByLabel('Email').fill('editor@collab.local')
  await editorPage.getByLabel('Password').fill('editorpass')
  await editorPage.getByRole('button', { name: 'Sign In' }).click()

  await viewerPage.goto('/login')
  await viewerPage.getByLabel('Email').fill('viewer@collab.local')
  await viewerPage.getByLabel('Password').fill('viewerpass')
  await viewerPage.getByRole('button', { name: 'Sign In' }).click()

  const editorMetric = editorPage.locator('[data-testid="metric-deployments"] p')
  const viewerMetric = viewerPage.locator('[data-testid="metric-deployments"] p')

  const initial = Number((await editorMetric.textContent()) ?? '0')

  await editorPage.locator('[data-testid="metric-deployments"] button', { hasText: '+1' }).click()

  await expect(editorMetric).toHaveText(String(initial + 1))
  await expect(viewerMetric).toHaveText(String(initial + 1))
  await expect(viewerPage.locator('[data-testid="notification-feed"]')).toContainText('changed deployments')

  await editor.close()
  await viewer.close()
})
