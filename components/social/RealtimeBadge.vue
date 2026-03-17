<script setup lang="ts">
defineProps<{ connected: boolean }>()
</script>

<template>
  <div class="realtime-badge">
    <span class="dot" :class="{ on: connected }" />
    <span>{{ connected ? 'Realtime feed connected' : 'Realtime feed reconnecting' }}</span>
  </div>
</template>

<style scoped>
.realtime-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--line);
}
.dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  background: rgba(120, 120, 120, 0.35);
}
.on {
  background: var(--teal);
}
</style>
