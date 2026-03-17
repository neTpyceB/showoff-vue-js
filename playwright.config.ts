import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 8000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: process.env.CI ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: [
    {
      command: 'npm run dev:api',
      port: 3000,
      reuseExistingServer: false,
    },
    {
      command: process.env.CI
        ? 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173'
        : 'npm run dev:web -- --host 127.0.0.1 --port 5173',
      port: process.env.CI ? 4173 : 5173,
      reuseExistingServer: false,
    },
  ],
})
