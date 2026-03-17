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
    <p class="module-kicker">Pipeline Mesh</p>
    <h2>{{ title }}</h2>
    <p>{{ summary }}</p>
    <div class="kanban">
      <article><strong>41</strong><span>Qualified</span></article>
      <article><strong>17</strong><span>At risk</span></article>
      <article><strong>9</strong><span>Revived</span></article>
    </div>
    <button :disabled="!canManage" @click="emit('run')">Sync contacts</button>
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
.kanban {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
article {
  display: grid;
  gap: 0.25rem;
  padding: 0.8rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.58);
}
</style>
