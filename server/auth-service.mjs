import express from 'express'
import cors from 'cors'
import { createToken, getUserByToken, tenants, users } from './domain.mjs'

export function createAuthService() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.post('/login', (req, res) => {
    const { email, password } = req.body ?? {}
    const user = users.find((item) => item.email === email && item.password === password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: createToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tenants: user.memberships.map((membership) => ({
        tenantId: membership.tenantId,
        role: membership.role,
        name: tenants.find((tenant) => tenant.id === membership.tenantId)?.name ?? membership.tenantId,
      })),
    })
  })

  app.get('/session', (req, res) => {
    const auth = req.headers.authorization ?? ''
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = getUserByToken(auth.replace('Bearer ', ''))
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tenants: user.memberships.map((membership) => ({
        tenantId: membership.tenantId,
        role: membership.role,
        name: tenants.find((tenant) => tenant.id === membership.tenantId)?.name ?? membership.tenantId,
      })),
    })
  })

  return app
}
