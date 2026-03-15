<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [email: string, password: string] }>()
const email = ref('dev@kb.local')
const password = ref('devpass')

function submit() {
  emit('submit', email.value.trim(), password.value)
}
</script>

<template>
  <form class="auth" @submit.prevent="submit">
    <h1>Developer Knowledge Base</h1>
    <input v-model="email" aria-label="Email" type="email" required />
    <input v-model="password" aria-label="Password" type="password" required />
    <button type="submit">Sign In</button>
  </form>
</template>

<style scoped>
.auth {
  display: grid;
  gap: 0.75rem;
  max-width: 24rem;
}
</style>
