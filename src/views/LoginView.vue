<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/collab/LoginForm.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()
const error = ref('')

async function signIn(email: string, password: string) {
  error.value = ''
  try {
    await auth.login(email, password)
    await router.push('/')
  } catch {
    error.value = auth.error.value
  }
}
</script>

<template>
  <LoginForm @submit="signIn" />
  <p v-if="error">{{ error }}</p>
</template>
