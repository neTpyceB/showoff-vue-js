import type { BootstrapPayload, TenantMembership, User } from '../types/saas'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API ${response.status}`)
  }

  return (await response.json()) as T
}

export function login(email: string, password: string) {
  return request<{ token: string; user: User; tenants: TenantMembership[] }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getBootstrap(token: string, tenantId: string) {
  return request<BootstrapPayload>(`/bootstrap?tenantId=${encodeURIComponent(tenantId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function runModuleAction(token: string, tenantId: string, moduleKey: string) {
  return request<{ ok: true; notice: string }>(`/tenants/${tenantId}/modules/${moduleKey}/run`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}
