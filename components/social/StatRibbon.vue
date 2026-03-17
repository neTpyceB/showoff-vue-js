<script setup lang="ts">
defineProps<{ stats: { activeReaders: string; liveRooms: string; cacheHitRate: string } }>()
</script>

<template>
  <section class="stats">
    <article><strong>{{ stats.activeReaders }}</strong><span>active readers</span></article>
    <article><strong>{{ stats.liveRooms }}</strong><span>live rooms</span></article>
    <article><strong>{{ stats.cacheHitRate }}</strong><span>edge hit rate</span></article>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}
article {
  display: grid;
  gap: 0.2rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.76);
}
strong {
  font-size: 1.7rem;
}
</style>
