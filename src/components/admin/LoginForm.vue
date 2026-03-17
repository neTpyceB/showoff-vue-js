<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ submit: [email: string, password: string] }>()
const email = ref('owner@saas.local')
const password = ref('ownerpass')

function submit() {
  emit('submit', email.value.trim(), password.value)
}
</script>

<template>
  <form class="login-card" @submit.prevent="submit">
    <p class="eyebrow">Modular SaaS Admin Platform</p>
    <h1>Tenant-aware control plane</h1>
    <p class="lede">Dynamic modules, policy-gated actions, and tenant-specific navigation from a microservices backend.</p>
    <input v-model="email" aria-label="Email" type="email" required />
    <input v-model="password" aria-label="Password" type="password" required />
    <button type="submit">Access platform</button>
  </form>
</template>

<style scoped>
.login-card {
  max-width: 32rem;
  display: grid;
  gap: 0.9rem;
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  background: rgba(250, 244, 235, 0.92);
  box-shadow: 0 22px 60px rgba(34, 24, 12, 0.12);
}
.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
  color: var(--accent);
}
h1,
.lede {
  margin: 0;
}
</style>
