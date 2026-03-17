export function canAccess(policies: string[], moduleKey: string, action: 'view' | 'manage' | 'configure') {
  return (
    policies.includes('*:manage') ||
    policies.includes(`${moduleKey}:${action}`) ||
    (action !== 'configure' && policies.includes(`${moduleKey}:manage`)) ||
    (action === 'configure' && policies.includes('platform:configure'))
  )
}
