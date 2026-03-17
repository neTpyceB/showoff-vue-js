import request from 'supertest'
import { WebSocket } from 'ws'
import { afterEach, describe, expect, it } from 'vitest'
import { createRealtimeServer } from './realtime.mjs'

const servers: Array<{ close: () => void }> = []

afterEach(() => {
  while (servers.length) {
    servers.pop()?.close()
  }
})

describe('realtime API', () => {
  it('blocks viewer from state updates', async () => {
    const { app } = createRealtimeServer()

    const login = await request(app).post('/auth/login').send({ email: 'viewer@collab.local', password: 'viewerpass' })

    const res = await request(app)
      .patch('/state')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({ key: 'deployments', delta: 1 })

    expect(res.status).toBe(403)
  })

  it('broadcasts websocket state after update', async () => {
    const { app, server } = createRealtimeServer()
    await new Promise<void>((resolve) => server.listen(0, resolve))
    servers.push(server)

    const address = server.address()
    if (!address || typeof address === 'string') throw new Error('No port')

    const login = await request(app).post('/auth/login').send({ email: 'editor@collab.local', password: 'editorpass' })
    const token = login.body.token as string

    const ws = new WebSocket(`ws://127.0.0.1:${address.port}/ws?token=${token}`)
    let gotUpdated = false

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('ws timeout')), 5000)

      ws.on('message', async (raw) => {
        const msg = JSON.parse(String(raw)) as { type: string; state?: { deployments: number } }
        if (msg.type === 'state' && msg.state) {
          await request(app)
            .patch('/state')
            .set('Authorization', `Bearer ${token}`)
            .send({ key: 'deployments', delta: 1 })

          ws.on('message', (nextRaw) => {
            const next = JSON.parse(String(nextRaw)) as { type: string; state?: { deployments: number } }
            if (next.type === 'state' && next.state && next.state.deployments >= msg.state.deployments + 1) {
              gotUpdated = true
              clearTimeout(timeout)
              ws.close()
              resolve()
            }
          })
          return
        }
      })
    })

    expect(gotUpdated).toBe(true)
  })
})
