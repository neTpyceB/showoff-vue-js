<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [email: string, password: string] }>()
const email = ref('editor@collab.local')
const password = ref('editorpass')

function submit() {
  emit('submit', email.value.trim(), password.value)
}
</script>

<template>
  <form class="login" @submit.prevent="submit">
    <h1>Real-time Collaboration Dashboard</h1>
    <input v-model="email" aria-label="Email" required type="email" />
    <input v-model="password" aria-label="Password" required type="password" />
    <button type="submit">Sign In</button>
  </form>
</template>

<style scoped>
.login {
  display: grid;
  gap: 0.75rem;
  max-width: 24rem;
}
</style>
