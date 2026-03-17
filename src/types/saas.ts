export type Role = 'owner' | 'manager' | 'viewer'

export interface TenantMembership {
  tenantId: string
  name: string
  role: Role
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Tenant {
  id: string
  name: string
  accent: string
  modules: string[]
}

export interface ModuleManifest {
  key: string
  path: string
  title: string
  summary: string
  actionLabel: string
}

export interface BootstrapPayload {
  tenant: Tenant
  modules: ModuleManifest[]
  navigation: Array<{ key: string; title: string; path: string }>
  policies: string[]
  membership: TenantMembership
  user: User
  tenants: TenantMembership[]
}
