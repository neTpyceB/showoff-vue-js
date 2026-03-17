import type { DashboardState, User } from '../types/collab'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API ${res.status}`)
  }

  return (await res.json()) as T
}

export function login(email: string, password: string): Promise<{ token: string; user: User }> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getState(token: string): Promise<{ state: DashboardState }> {
  return request('/state', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function patchState(token: string, key: keyof Omit<DashboardState, 'version'>, delta: number) {
  return request<{ state: DashboardState }>('/state', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ key, delta }),
  })
}
