import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from './app.mjs'

describe('knowledge base API', () => {
  it('authenticates valid users', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'dev@kb.local', password: 'devpass' })

    expect(res.status).toBe(200)
    expect(res.body.token).toContain('token-')
  })

  it('filters articles', async () => {
    const res = await request(app).get('/articles').query({ tag: 'vue' })

    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
