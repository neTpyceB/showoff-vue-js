<script setup lang="ts">
import type { DashboardState } from '../../types/collab'

defineProps<{ state: DashboardState; canEdit: boolean }>()
const emit = defineEmits<{ change: [key: 'activeUsers' | 'deployments' | 'incidents', delta: number] }>()
</script>

<template>
  <section class="cards">
    <article data-testid="metric-activeUsers">
      <h3>Active Users</h3>
      <p>{{ state.activeUsers }}</p>
      <div>
        <button :disabled="!canEdit" @click="emit('change', 'activeUsers', 1)">+1</button>
        <button :disabled="!canEdit" @click="emit('change', 'activeUsers', -1)">-1</button>
      </div>
    </article>
    <article data-testid="metric-deployments">
      <h3>Deployments</h3>
      <p>{{ state.deployments }}</p>
      <div>
        <button :disabled="!canEdit" @click="emit('change', 'deployments', 1)">+1</button>
        <button :disabled="!canEdit" @click="emit('change', 'deployments', -1)">-1</button>
      </div>
    </article>
    <article data-testid="metric-incidents">
      <h3>Incidents</h3>
      <p>{{ state.incidents }}</p>
      <div>
        <button :disabled="!canEdit" @click="emit('change', 'incidents', 1)">+1</button>
        <button :disabled="!canEdit" @click="emit('change', 'incidents', -1)">-1</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}
article {
  border: 1px solid #d6dce5;
  border-radius: 0.5rem;
  padding: 0.75rem;
}
</style>
