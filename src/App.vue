<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const auth = useAuth()
const user = auth.user
const isAuthenticated = auth.isAuthenticated

async function logout() {
  auth.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <header>
      <RouterLink to="/">Knowledge Base</RouterLink>
      <div class="right">
        <span v-if="user">{{ user.email }}</span>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 70rem;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.right {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
</style>
