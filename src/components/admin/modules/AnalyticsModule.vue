<script setup lang="ts">
defineProps<{
  title: string
  summary: string
  canManage: boolean
}>()

const emit = defineEmits<{ run: [] }>()
</script>

<template>
  <section class="module-card">
    <p class="module-kicker">Signal Engine</p>
    <h2>{{ title }}</h2>
    <p>{{ summary }}</p>
    <div class="stats">
      <article><strong>94%</strong><span>Retention score</span></article>
      <article><strong>18</strong><span>Watchlist anomalies</span></article>
      <article><strong>6m</strong><span>Data freshness</span></article>
    </div>
    <button :disabled="!canManage" @click="emit('run')">Refresh analytics</button>
  </section>
</template>

<style scoped>
.module-card {
  display: grid;
  gap: 1rem;
}
.module-kicker {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
  color: var(--accent);
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
}
article {
  display: grid;
  gap: 0.2rem;
  padding: 0.8rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.58);
}
strong {
  font-size: 1.5rem;
}
</style>
