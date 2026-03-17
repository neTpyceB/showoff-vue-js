import { ref } from 'vue'
import { getState, patchState } from '../lib/api'
import { canEdit } from '../lib/permissions'
import type { DashboardState, NotificationEvent, Role } from '../types/collab'

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:3000'

export function useRealtime(token: string, role: Role) {
  const state = ref<DashboardState>({ activeUsers: 0, deployments: 0, incidents: 0, version: 0 })
  const notifications = ref<NotificationEvent[]>([])
  const connected = ref(false)
  const error = ref('')
  let socket: WebSocket | null = null

  async function load() {
    const data = await getState(token)
    state.value = data.state
  }

  async function connect() {
    await load()

    socket = new WebSocket(`${WS_URL}/ws?token=${encodeURIComponent(token)}`)
    socket.addEventListener('open', () => {
      connected.value = true
    })
    socket.addEventListener('close', () => {
      connected.value = false
    })
    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(String(event.data)) as
        | { type: 'state'; state: DashboardState }
        | { type: 'notification'; id: string; message: string; createdAt: string; level: 'info' | 'success' | 'warning' }

      if (msg.type === 'state') {
        state.value = msg.state
      }
      if (msg.type === 'notification') {
        notifications.value.unshift(msg)
      }
    })
  }

  async function change(key: keyof Omit<DashboardState, 'version'>, delta: number) {
    if (!canEdit(role)) {
      error.value = 'You do not have permission'
      return
    }

    error.value = ''
    await patchState(token, key, delta)
  }

  function disconnect() {
    socket?.close()
    socket = null
  }

  return { state, notifications, connected, error, connect, change, disconnect }
}
