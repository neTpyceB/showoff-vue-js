import { computed, ref } from 'vue'
import { login as loginApi } from '../lib/api'
import type { User } from '../types/collab'

const TOKEN_KEY = 'collab-token'
const USER_KEY = 'collab-user'

const token = ref(localStorage.getItem(TOKEN_KEY) ?? '')
const user = ref<User | null>(safeParse(localStorage.getItem(USER_KEY)))
const error = ref('')

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(email: string, password: string) {
    error.value = ''
    try {
      const data = await loginApi(email, password)
      token.value = data.token
      user.value = data.user
      localStorage.setItem(TOKEN_KEY, token.value)
      localStorage.setItem(USER_KEY, JSON.stringify(user.value))
    } catch {
      error.value = 'Login failed'
      throw new Error(error.value)
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, error, isAuthenticated, login, logout }
}

function safeParse(raw: string | null): User | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}
