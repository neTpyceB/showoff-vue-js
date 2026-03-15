<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [title: string] }>()
const title = ref('')

function submit() {
  const value = title.value.trim()
  if (!value) return

  emit('submit', value)
  title.value = ''
}
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <input v-model="title" aria-label="Task title" placeholder="Add task" required />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
}
</style>
