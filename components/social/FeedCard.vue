<script setup lang="ts">
defineProps<{
  item: {
    id: string
    community: string
    headline: string
    excerpt: string
    momentum: number
    format: string
    author?: { name: string; role: string }
  }
}>()
</script>

<template>
  <article class="feed-card" :data-feed-id="item.id">
    <div class="feed-meta">
      <span>{{ item.community }}</span>
      <span>{{ item.format }}</span>
      <span>{{ item.momentum }} momentum</span>
    </div>
    <h2>{{ item.headline }}</h2>
    <p>{{ item.excerpt }}</p>
    <footer>
      <strong>{{ item.author?.name }}</strong>
      <span>{{ item.author?.role }}</span>
    </footer>
  </article>
</template>

<style scoped>
.feed-card {
  display: grid;
  gap: 0.8rem;
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  background: var(--surface-strong);
  box-shadow: 0 18px 40px rgba(24, 28, 33, 0.08);
}
.feed-meta,
footer {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  color: var(--ink-soft);
}
</style>
