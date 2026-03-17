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
    <p class="module-kicker">Revenue Spine</p>
    <h2>{{ title }}</h2>
    <p>{{ summary }}</p>
    <ul class="ledger">
      <li><span>Failed invoices</span><strong>12</strong></li>
      <li><span>MRR at risk</span><strong>$18.4k</strong></li>
      <li><span>Credit holds</span><strong>3</strong></li>
    </ul>
    <button :disabled="!canManage" @click="emit('run')">Run reconciliation</button>
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
.ledger {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.58);
}
</style>
