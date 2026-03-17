<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/admin/LoginForm.vue'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()
const router = useRouter()
const error = ref('')

async function signIn(email: string, password: string) {
  error.value = ''
  try {
    await auth.login(email, password)
    await router.push(`/${auth.activeTenantId.value}`)
  } catch {
    error.value = auth.error.value
  }
}
</script>

<template>
  <section class="login-shell">
    <div class="login-copy">
      <p class="tag">Microservices backend</p>
      <h2>Gateway, auth, and tenant module services</h2>
      <p>Each tenant bootstraps a different control plane. Routes, modules, and permissions are resolved at runtime.</p>
    </div>
    <div>
      <LoginForm @submit="signIn" />
      <p v-if="error">{{ error }}</p>
    </div>
  </section>
</template>

<style scoped>
.login-shell {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: center;
  min-height: calc(100vh - 6rem);
}
.tag {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
}
@media (max-width: 900px) {
  .login-shell {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
</style>
