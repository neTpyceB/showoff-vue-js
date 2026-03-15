<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <nav>
      <RouterLink to="/">Tasks</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 48rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.router-link-exact-active {
  font-weight: 700;
}
</style>
