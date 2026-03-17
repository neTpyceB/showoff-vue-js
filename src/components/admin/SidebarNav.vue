<script setup lang="ts">
defineProps<{
  tenantId: string
  items: Array<{ key: string; title: string; path: string }>
}>()
</script>

<template>
  <nav class="sidebar">
    <RouterLink
      v-for="item in items"
      :key="item.key"
      :to="`/${tenantId}/${item.path}`"
      class="nav-link"
    >
      {{ item.title }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.sidebar {
  display: grid;
  gap: 0.55rem;
}
.nav-link {
  padding: 0.75rem 0.9rem;
  border-radius: 0.85rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.6);
}
.router-link-active {
  background: var(--panel-strong);
  color: var(--ink-strong);
  border-color: var(--accent);
}
</style>
