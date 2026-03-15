import { computed, ref } from 'vue'
import { login as loginApi } from '../lib/api'
import type { User } from '../types/kb'

const TOKEN_KEY = 'kb-token'
const USER_KEY = 'kb-user'

const token = ref<string>(localStorage.getItem(TOKEN_KEY) ?? '')
const user = ref<User | null>(safeParse(localStorage.getItem(USER_KEY)))

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(email: string, password: string) {
    const data = await loginApi(email, password)
    token.value = data.token
    user.value = data.user

    localStorage.setItem(TOKEN_KEY, token.value)
    localStorage.setItem(USER_KEY, JSON.stringify(user.value))
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
}

function safeParse(raw: string | null): User | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}
