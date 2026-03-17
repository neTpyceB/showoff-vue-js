export const tenants = [
  {
    id: 'acme',
    name: 'Acme Industries',
    accent: 'ember',
    modules: ['analytics', 'billing', 'settings'],
  },
  {
    id: 'globex',
    name: 'Globex Labs',
    accent: 'ocean',
    modules: ['analytics', 'crm'],
  },
  {
    id: 'northwind',
    name: 'Northwind Cloud',
    accent: 'forest',
    modules: ['analytics', 'crm', 'settings'],
  },
]

export const moduleCatalog = {
  analytics: {
    key: 'analytics',
    path: 'analytics',
    title: 'Analytics Hub',
    summary: 'Cross-tenant KPIs, conversion health, and anomaly watchlists.',
    actionLabel: 'Refresh snapshot',
  },
  billing: {
    key: 'billing',
    path: 'billing',
    title: 'Billing Ops',
    summary: 'Revenue controls, invoice exceptions, and dunning automation.',
    actionLabel: 'Run reconciliation',
  },
  crm: {
    key: 'crm',
    path: 'crm',
    title: 'CRM Sync',
    summary: 'Pipeline sync, account rollups, and stale lead recovery.',
    actionLabel: 'Sync contacts',
  },
  settings: {
    key: 'settings',
    path: 'settings',
    title: 'Tenant Settings',
    summary: 'Brand, policy, and plugin configuration for each tenant.',
    actionLabel: 'Apply configuration',
  },
}

export const users = [
  {
    id: 'u1',
    email: 'owner@saas.local',
    password: 'ownerpass',
    name: 'Platform Owner',
    memberships: [
      { tenantId: 'acme', role: 'owner' },
      { tenantId: 'globex', role: 'viewer' },
    ],
  },
  {
    id: 'u2',
    email: 'ops@saas.local',
    password: 'opspass',
    name: 'Operations Lead',
    memberships: [
      { tenantId: 'northwind', role: 'manager' },
      { tenantId: 'acme', role: 'manager' },
    ],
  },
]

export const rolePolicies = {
  owner: ['*:view', '*:manage', 'platform:configure'],
  manager: ['analytics:view', 'analytics:manage', 'billing:view', 'billing:manage', 'crm:view', 'crm:manage', 'settings:view'],
  viewer: ['analytics:view', 'billing:view', 'crm:view', 'settings:view'],
}

export function createToken(userId) {
  return `tenant-token-${userId}`
}

export function parseToken(token) {
  return token.replace('tenant-token-', '')
}

export function getUserByToken(token) {
  const userId = parseToken(token)
  return users.find((user) => user.id === userId) ?? null
}

export function getTenant(tenantId) {
  return tenants.find((tenant) => tenant.id === tenantId) ?? null
}

export function getPolicies(role, enabledModules) {
  const raw = rolePolicies[role] ?? []
  return raw.filter((policy) => {
    if (policy.startsWith('*:')) {
      return true
    }

    const [moduleKey] = policy.split(':')
    return moduleKey === 'platform' || enabledModules.includes(moduleKey)
  })
}

export function canPerform(policies, moduleKey, action) {
  return (
    policies.includes('*:manage') ||
    policies.includes(`*:${action}`) ||
    policies.includes(`${moduleKey}:${action}`) ||
    policies.includes(`${moduleKey}:manage`)
  )
}
