<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import AppFrame from '~/components/social/AppFrame.vue'
import FeedCard from '~/components/social/FeedCard.vue'
import FeedFilters from '~/components/social/FeedFilters.vue'
import RealtimeBadge from '~/components/social/RealtimeBadge.vue'
import StatRibbon from '~/components/social/StatRibbon.vue'
import StoryRail from '~/components/social/StoryRail.vue'
import TrendPanel from '~/components/social/TrendPanel.vue'
import type { FeedItem } from '~/lib/feed-state'
import type { HomeSnapshot } from '~/lib/home-snapshot'

useSeoMeta({
  title: 'PulseLine',
  description: 'SSR social platform frontend with edge caching, real-time feeds, and distributed service aggregation.',
})

const { data } = await useAsyncData<HomeSnapshot>('home', () => $fetch('/api/home'))
const home = useHomeState()
const config = useRuntimeConfig()
const streamConnected = ref(false)
let source: EventSource | null = null

watchEffect(() => {
  if (data.value) {
    home.seed(data.value)
  }
})

onMounted(() => {
  source = new EventSource(config.public.feedStreamUrl)
  source.addEventListener('open', () => {
    streamConnected.value = true
  })
  source.addEventListener('error', () => {
    streamConnected.value = false
  })
  source.addEventListener('feed-item', (event) => {
    const payload = JSON.parse((event as MessageEvent).data) as FeedItem
    home.prependLiveItem(payload)
  })
})

onUnmounted(() => {
  source?.close()
})
</script>

<template>
  <AppFrame>
    <section class="hero-grid">
      <div class="hero-copy">
        <p class="tag">SSR at social scale</p>
        <h2>Fast first paint, cached globally, and continuously updated from distributed feeds.</h2>
        <p>
          Nitro route rules cache the expensive aggregate view, while the live stream hydrates only the feed lane that changes.
        </p>
        <RealtimeBadge :connected="streamConnected" />
      </div>
      <StatRibbon :stats="data?.stats ?? { activeReaders: '0', liveRooms: '0', cacheHitRate: '0%' }" />
    </section>

    <section class="layout">
      <main class="main-column">
        <StoryRail :items="home.stories.value" />
        <FeedFilters v-model="home.activeFilter.value" />
        <div class="feed-stack">
          <FeedCard v-for="item in home.visibleFeed.value" :key="item.id" :item="item" />
        </div>
      </main>
      <TrendPanel :items="home.trends.value" />
    </section>
  </AppFrame>
</template>

<style scoped>
.hero-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}
.hero-copy {
  display: grid;
  gap: 0.75rem;
  padding: 1.1rem;
  border-radius: 1.3rem;
  background: var(--surface);
  border: 1px solid var(--line);
}
.tag {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--teal);
}
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 21rem;
  gap: 1rem;
}
.main-column {
  display: grid;
  gap: 1rem;
}
.feed-stack {
  display: grid;
  gap: 0.85rem;
}
@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
