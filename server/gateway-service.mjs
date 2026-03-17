import cors from 'cors'
import express from 'express'

export function createGatewayService(options = {}) {
  const authUrl = options.authUrl ?? process.env.AUTH_SERVICE_URL ?? 'http://127.0.0.1:3001'
  const moduleUrl = options.moduleUrl ?? process.env.MODULE_SERVICE_URL ?? 'http://127.0.0.1:3002'

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', async (_req, res) => {
    const [authHealth, moduleHealth] = await Promise.all([
      fetchJson(`${authUrl}/health`),
      fetchJson(`${moduleUrl}/health`),
    ])

    res.json({ ok: authHealth.ok && moduleHealth.ok })
  })

  app.post('/auth/login', async (req, res) => {
    const response = await fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    })

    return pipeJson(response, res)
  })

  app.get('/bootstrap', authGuard(authUrl), async (req, res) => {
    const tenantId = String(req.query.tenantId ?? '')
    const membership = req.session.tenants.find((item) => item.tenantId === tenantId)

    if (!membership) {
      return res.status(403).json({ message: 'Tenant access denied' })
    }

    const response = await fetch(`${moduleUrl}/tenants/${tenantId}/bootstrap?role=${membership.role}`)
    const data = await response.json()

    return res.json({
      tenant: data.tenant,
      modules: data.modules,
      navigation: data.navigation,
      policies: data.policies,
      membership,
      user: req.session.user,
      tenants: req.session.tenants,
    })
  })

  app.post('/tenants/:tenantId/modules/:moduleKey/run', authGuard(authUrl), async (req, res) => {
    const membership = req.session.tenants.find((item) => item.tenantId === req.params.tenantId)
    if (!membership) {
      return res.status(403).json({ message: 'Tenant access denied' })
    }

    const response = await fetch(`${moduleUrl}/tenants/${req.params.tenantId}/modules/${req.params.moduleKey}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-role': membership.role,
        'x-user-name': req.session.user.name,
      },
      body: JSON.stringify(req.body ?? {}),
    })

    return pipeJson(response, res)
  })

  return app
}

function authGuard(authUrl) {
  return async (req, res, next) => {
    const auth = req.headers.authorization ?? ''
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const response = await fetch(`${authUrl}/session`, {
      headers: { Authorization: auth },
    })

    if (!response.ok) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.session = await response.json()
    return next()
  }
}

async function pipeJson(response, res) {
  const data = await response.json()
  res.status(response.status).json(data)
}

async function fetchJson(url) {
  const response = await fetch(url)
  return response.json()
}
