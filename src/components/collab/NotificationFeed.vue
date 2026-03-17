<script setup lang="ts">
import type { NotificationEvent } from '../../types/collab'

defineProps<{ items: NotificationEvent[] }>()
</script>

<template>
  <section>
    <h2>Notifications</h2>
    <ul class="feed" data-testid="notification-feed">
      <li v-for="item in items" :key="item.id">{{ item.message }}</li>
    </ul>
  </section>
</template>

<style scoped>
.feed {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
</style>
