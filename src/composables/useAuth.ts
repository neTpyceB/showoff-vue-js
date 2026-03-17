import { computed, ref } from 'vue'
import { login as loginApi } from '../lib/api'
import type { TenantMembership, User } from '../types/saas'

const TOKEN_KEY = 'saas-token'
const USER_KEY = 'saas-user'
const TENANTS_KEY = 'saas-tenants'
const ACTIVE_TENANT_KEY = 'saas-active-tenant'

const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')
const user = ref<User | null>(safeParse<User>(localStorage.getItem(USER_KEY)))
const tenants = ref<TenantMembership[]>(safeParse<TenantMembership[]>(localStorage.getItem(TENANTS_KEY)) ?? [])
const activeTenantId = ref(localStorage.getItem(ACTIVE_TENANT_KEY) ?? '')
const error = ref('')

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(email: string, password: string) {
    error.value = ''
    try {
      const data = await loginApi(email, password)
      token.value = data.token
      user.value = data.user
      tenants.value = data.tenants
      activeTenantId.value = data.tenants[0]?.tenantId ?? ''

      localStorage.setItem(TOKEN_KEY, token.value)
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
      localStorage.setItem(TENANTS_KEY, JSON.stringify(tenants.value))
      localStorage.setItem(ACTIVE_TENANT_KEY, activeTenantId.value)
    } catch {
      error.value = 'Login failed'
      throw new Error(error.value)
    }
  }

  function setActiveTenant(tenantId: string) {
    activeTenantId.value = tenantId
    localStorage.setItem(ACTIVE_TENANT_KEY, tenantId)
  }

  function logout() {
    token.value = ''
    user.value = null
    tenants.value = []
    activeTenantId.value = ''
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TENANTS_KEY)
    localStorage.removeItem(ACTIVE_TENANT_KEY)
  }

  return { token, user, tenants, activeTenantId, error, isAuthenticated, login, setActiveTenant, logout }
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}
