export type Role = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface DashboardState {
  activeUsers: number
  deployments: number
  incidents: number
  version: number
}

export interface NotificationEvent {
  id: string
  message: string
  createdAt: string
  level: 'info' | 'success' | 'warning'
}
