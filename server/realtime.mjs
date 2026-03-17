import http from 'node:http'
import cors from 'cors'
import express from 'express'
import { WebSocketServer } from 'ws'

const users = [
  { id: 'u1', name: 'Admin', email: 'admin@collab.local', password: 'adminpass', role: 'admin' },
  { id: 'u2', name: 'Editor', email: 'editor@collab.local', password: 'editorpass', role: 'editor' },
  { id: 'u3', name: 'Viewer', email: 'viewer@collab.local', password: 'viewerpass', role: 'viewer' },
]

export function createRealtimeServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  const state = {
    activeUsers: 12,
    deployments: 3,
    incidents: 1,
    version: 1,
  }

  const server = http.createServer(app)
  const wss = new WebSocketServer({ server, path: '/ws' })

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body ?? {}
    const user = users.find((item) => item.email === email && item.password === password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    return res.json({
      token: tokenFor(user.id),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  })

  app.get('/state', authGuard, (_req, res) => {
    res.json({ state })
  })

  app.patch('/state', authGuard, (req, res) => {
    if (!canEdit(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const { key, delta } = req.body ?? {}
    if (!['activeUsers', 'deployments', 'incidents'].includes(key) || typeof delta !== 'number') {
      return res.status(400).json({ message: 'Invalid payload' })
    }

    state[key] = Math.max(0, state[key] + delta)
    state.version += 1

    broadcast(wss, { type: 'state', state })
    broadcast(wss, {
      type: 'notification',
      id: crypto.randomUUID(),
      message: `${req.user.name} changed ${key} by ${delta > 0 ? '+' : ''}${delta}`,
      createdAt: new Date().toISOString(),
      level: 'info',
    })

    return res.json({ state })
  })

  wss.on('connection', (socket, req) => {
    const url = new URL(req.url ?? '/ws', 'http://localhost')
    const token = url.searchParams.get('token') ?? ''
    const user = userFromToken(token)

    if (!user) {
      socket.close(4401, 'Unauthorized')
      return
    }

    socket.send(JSON.stringify({ type: 'state', state }))
    socket.send(
      JSON.stringify({
        type: 'notification',
        id: crypto.randomUUID(),
        message: `${user.name} joined dashboard`,
        createdAt: new Date().toISOString(),
        level: 'success',
      }),
    )
  })

  return { app, server, wss }
}

function authGuard(req, res, next) {
  const auth = req.headers.authorization ?? ''
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const user = userFromToken(auth.replace('Bearer ', ''))
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  req.user = user
  return next()
}

function tokenFor(userId) {
  return `token-${userId}`
}

function userFromToken(token) {
  const id = token.replace('token-', '')
  return users.find((user) => user.id === id) ?? null
}

function canEdit(role) {
  return role === 'admin' || role === 'editor'
}

function broadcast(wss, payload) {
  const raw = JSON.stringify(payload)
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(raw)
    }
  }
}
