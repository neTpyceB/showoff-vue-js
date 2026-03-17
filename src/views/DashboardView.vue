<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import DashboardCards from '../components/collab/DashboardCards.vue'
import NotificationFeed from '../components/collab/NotificationFeed.vue'
import { useAuth } from '../composables/useAuth'
import { useRealtime } from '../composables/useRealtime'
import { canEdit } from '../lib/permissions'

const auth = useAuth()
const realtime = useRealtime(auth.token.value, auth.user.value?.role ?? 'viewer')
const state = realtime.state
const notifications = realtime.notifications
const connected = realtime.connected
const error = realtime.error

onMounted(() => {
  void realtime.connect()
})

onUnmounted(() => {
  realtime.disconnect()
})

const mayEdit = computed(() => canEdit(auth.user.value?.role ?? 'viewer'))
</script>

<template>
  <section>
    <h1>Collaboration Dashboard</h1>
    <p>Connection: {{ connected ? 'Live' : 'Disconnected' }}</p>
    <DashboardCards :can-edit="mayEdit" :state="state" @change="realtime.change" />
    <p v-if="error">{{ error }}</p>
    <NotificationFeed :items="notifications" />
  </section>
</template>
