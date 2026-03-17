import http from 'node:http'
import request from 'supertest'
import { afterEach, describe, expect, it } from 'vitest'
import { createAuthService } from './auth-service.mjs'
import { createGatewayService } from './gateway-service.mjs'
import { createModuleService } from './module-service.mjs'

const servers = []

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise((resolve, reject) => {
          server.close((error) => {
            if (error) reject(error)
            else resolve(undefined)
          })
        }),
    ),
  )
})

describe('gateway service', () => {
  it('aggregates tenant bootstrap from auth and module services', async () => {
    const authServer = await listen(createAuthService())
    const moduleServer = await listen(createModuleService())
    const gateway = createGatewayService({
      authUrl: `http://127.0.0.1:${authServer.address().port}`,
      moduleUrl: `http://127.0.0.1:${moduleServer.address().port}`,
    })

    const login = await request(gateway).post('/auth/login').send({
      email: 'owner@saas.local',
      password: 'ownerpass',
    })

    const bootstrap = await request(gateway)
      .get('/bootstrap')
      .query({ tenantId: 'acme' })
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(bootstrap.status).toBe(200)
    expect(bootstrap.body.modules.map((moduleItem) => moduleItem.key)).toContain('billing')
    expect(bootstrap.body.membership.role).toBe('owner')
  })

  it('enforces tenant role permissions on module actions', async () => {
    const authServer = await listen(createAuthService())
    const moduleServer = await listen(createModuleService())
    const gateway = createGatewayService({
      authUrl: `http://127.0.0.1:${authServer.address().port}`,
      moduleUrl: `http://127.0.0.1:${moduleServer.address().port}`,
    })

    const login = await request(gateway).post('/auth/login').send({
      email: 'owner@saas.local',
      password: 'ownerpass',
    })

    const forbidden = await request(gateway)
      .post('/tenants/globex/modules/crm/run')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(forbidden.status).toBe(403)
  })
})

async function listen(app) {
  const server = http.createServer(app)
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  servers.push(server)
  return server
}
