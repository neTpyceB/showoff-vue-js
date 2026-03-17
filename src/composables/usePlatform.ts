import { ref } from 'vue'
import { getBootstrap, runModuleAction } from '../lib/api'
import type { BootstrapPayload } from '../types/saas'

const bootstrap = ref<BootstrapPayload | null>(null)
const loading = ref(false)
const notice = ref('')
const error = ref('')

export function usePlatform() {
  async function load(token: string, tenantId: string) {
    loading.value = true
    error.value = ''
    try {
      bootstrap.value = await getBootstrap(token, tenantId)
    } catch {
      bootstrap.value = null
      error.value = 'Failed to load tenant workspace'
    } finally {
      loading.value = false
    }
  }

  async function runAction(token: string, tenantId: string, moduleKey: string) {
    error.value = ''
    try {
      const response = await runModuleAction(token, tenantId, moduleKey)
      notice.value = response.notice
    } catch {
      error.value = 'Action denied or backend unavailable'
    }
  }

  function clearMessages() {
    notice.value = ''
    error.value = ''
  }

  return { bootstrap, loading, notice, error, load, runAction, clearMessages }
}
