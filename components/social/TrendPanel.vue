<script setup lang="ts">
defineProps<{ items: Array<{ id: string; label: string; volume: string }> }>()
</script>

<template>
  <aside class="trend-panel">
    <h3>Edge-cached discovery</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        <span>{{ item.label }}</span>
        <strong>{{ item.volume }}</strong>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.trend-panel {
  padding: 1rem;
  border-radius: 1.2rem;
  border: 1px solid var(--line);
  background: var(--surface);
}
ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.65rem;
}
li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
