<script setup lang="ts">
defineProps<{ title: string; summary: string }>()
</script>

<template>
  <section class="module-card">
    <h2>{{ title }}</h2>
    <p>{{ summary }}</p>
    <p>This module key is not registered in the frontend plugin registry.</p>
  </section>
</template>

<style scoped>
.module-card {
  display: grid;
  gap: 0.75rem;
}
</style>
