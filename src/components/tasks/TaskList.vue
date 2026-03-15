<script setup lang="ts">
import type { Task } from '../../types.task'

defineProps<{ tasks: Task[] }>()
const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <ul class="task-list" aria-label="Tasks">
    <li v-for="task in tasks" :key="task.id">
      <label>
        <input :checked="task.done" type="checkbox" @change="emit('toggle', task.id)" />
        <span :class="{ done: task.done }">{{ task.title }}</span>
      </label>
      <button class="danger" @click="emit('remove', task.id)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: grid;
  gap: 0.75rem;
}
li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}
.done {
  text-decoration: line-through;
  opacity: 0.7;
}
.danger {
  color: #b00020;
}
</style>
