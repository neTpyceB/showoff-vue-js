<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const auth = useAuth()
const router = useRouter()
const user = auth.user
const isAuthenticated = auth.isAuthenticated

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="shell">
    <header>
      <RouterLink to="/">Realtime Dashboard</RouterLink>
      <div class="meta">
        <small v-if="user">{{ user.email }} ({{ user.role }})</small>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.shell {
  max-width: 72rem;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
