<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
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
    <header class="masthead">
      <div>
        <p class="eyebrow">Composable control plane</p>
        <h1>Modular SaaS Admin Platform</h1>
      </div>
      <div class="session">
        <p v-if="user">{{ user.email }}</p>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.shell {
  max-width: 86rem;
  margin: 0 auto;
  padding: 1.25rem;
}
.masthead {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 1rem;
}
.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
}
h1,
.session p {
  margin: 0;
}
.session {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
@media (max-width: 720px) {
  .masthead {
    flex-direction: column;
    align-items: start;
  }
}
</style>
