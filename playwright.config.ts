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
      command: 'PORT=4201 node services/feed-index.mjs',
      port: 4201,
      reuseExistingServer: true,
    },
    {
      command: 'PORT=4202 node services/profile-index.mjs',
      port: 4202,
      reuseExistingServer: true,
    },
    {
      command: 'PORT=4203 node services/discovery-index.mjs',
      port: 4203,
      reuseExistingServer: true,
    },
    {
      command: process.env.CI
        ? 'FEED_SERVICE_URL=http://127.0.0.1:4201 PROFILE_SERVICE_URL=http://127.0.0.1:4202 DISCOVERY_SERVICE_URL=http://127.0.0.1:4203 NUXT_PUBLIC_FEED_STREAM_URL=http://127.0.0.1:4201/events npm run build:web && FEED_SERVICE_URL=http://127.0.0.1:4201 PROFILE_SERVICE_URL=http://127.0.0.1:4202 DISCOVERY_SERVICE_URL=http://127.0.0.1:4203 NUXT_PUBLIC_FEED_STREAM_URL=http://127.0.0.1:4201/events HOST=127.0.0.1 PORT=4173 node .output/server/index.mjs'
        : 'FEED_SERVICE_URL=http://127.0.0.1:4201 PROFILE_SERVICE_URL=http://127.0.0.1:4202 DISCOVERY_SERVICE_URL=http://127.0.0.1:4203 NUXT_PUBLIC_FEED_STREAM_URL=http://127.0.0.1:4201/events npm run dev:web -- --host 127.0.0.1 --port 5173',
      port: process.env.CI ? 4173 : 5173,
      reuseExistingServer: false,
    },
  ],
})
