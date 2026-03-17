# Architecture

## Overview
- Nuxt SSR renders the home experience and acts as a lightweight BFF via `server/api`.
- Feed, profile, and discovery services stay isolated and are fetched in parallel on the server.
- The client hydrates only the interactive state and attaches a real-time EventSource for live feed inserts.

## Request flow
1. SSR request hits `pages/index.vue`.
2. `server/api/home.get.ts` aggregates timeline, stories, profiles, and trends from the three services.
3. Nitro route rules cache the aggregate response for CDN and edge layers.
4. Client hydration seeds `useHomeState()` and then subscribes to the feed stream.

## Performance model
- Edge cache on `/` and `/api/home` with stale-while-revalidate.
- Payload extraction enabled for smaller SSR payload reuse.
- Public assets compressed by Nitro.
- Real-time updates patch only feed state instead of re-fetching the whole page.
