export default defineNuxtConfig({
  compatibilityDate: '2026-03-17',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    payloadExtraction: true,
  },
  routeRules: {
    '/': {
      headers: {
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=600',
      },
    },
    '/api/home': {
      swr: 30,
      headers: {
        'cache-control': 'public, s-maxage=30, stale-while-revalidate=300',
      },
    },
  },
  runtimeConfig: {
    feedServiceUrl: process.env.FEED_SERVICE_URL ?? 'http://127.0.0.1:4101',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://127.0.0.1:4102',
    discoveryServiceUrl: process.env.DISCOVERY_SERVICE_URL ?? 'http://127.0.0.1:4103',
    public: {
      feedStreamUrl: process.env.NUXT_PUBLIC_FEED_STREAM_URL ?? 'http://127.0.0.1:4101/events',
    },
  },
})
