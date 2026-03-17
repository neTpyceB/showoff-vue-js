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
      command: 'PORT=3101 node server/auth-index.mjs',
      port: 3101,
      reuseExistingServer: false,
    },
    {
      command: 'PORT=3102 node server/modules-index.mjs',
      port: 3102,
      reuseExistingServer: false,
    },
    {
      command: 'AUTH_SERVICE_URL=http://127.0.0.1:3101 MODULE_SERVICE_URL=http://127.0.0.1:3102 PORT=3100 node server/index.mjs',
      port: 3100,
      reuseExistingServer: false,
    },
    {
      command: process.env.CI
        ? 'VITE_API_URL=http://127.0.0.1:3100 npm run build && VITE_API_URL=http://127.0.0.1:3100 npm run preview -- --host 127.0.0.1 --port 4173'
        : 'VITE_API_URL=http://127.0.0.1:3100 npm run dev:web -- --host 127.0.0.1 --port 5173',
      port: process.env.CI ? 4173 : 5173,
      reuseExistingServer: false,
    },
  ],
})
