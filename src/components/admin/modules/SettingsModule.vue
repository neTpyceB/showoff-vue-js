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
    <p class="module-kicker">Control Surface</p>
    <h2>{{ title }}</h2>
    <p>{{ summary }}</p>
    <div class="config-grid">
      <article>Brand skin / per-tenant</article>
      <article>Permission bundles / policy engine</article>
      <article>Plugin activation / route manifests</article>
    </div>
    <button :disabled="!canManage" @click="emit('run')">Apply configuration</button>
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
.config-grid {
  display: grid;
  gap: 0.65rem;
}
article {
  padding: 0.8rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.58);
}
</style>
