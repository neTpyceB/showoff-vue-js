<script setup lang="ts">
defineProps<{
  modelValue: 'for-you' | 'following' | 'live'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: 'for-you' | 'following' | 'live']
}>()

const filters = [
  { key: 'for-you', label: 'For You' },
  { key: 'following', label: 'Following' },
  { key: 'live', label: 'Live Now' },
] as const
</script>

<template>
  <div class="filter-row">
    <button
      v-for="filter in filters"
      :key="filter.key"
      :class="{ active: modelValue === filter.key }"
      @click="emit('update:modelValue', filter.key)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<style scoped>
.filter-row {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}
.active {
  background: var(--ink);
  color: white;
}
</style>
