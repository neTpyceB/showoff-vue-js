<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthForm from '../components/kb/AuthForm.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

async function signIn(email: string, password: string) {
  await login(email, password)
  await router.push('/')
}
</script>

<template>
  <AuthForm @submit="signIn" />
</template>
