import type { Role } from '../types/collab'

export function canEdit(role: Role): boolean {
  return role === 'admin' || role === 'editor'
}
