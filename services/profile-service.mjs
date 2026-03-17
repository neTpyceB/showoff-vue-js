import cors from 'cors'
import express from 'express'
import { profiles, stories } from './domain.mjs'

export function createProfileService() {
  const app = express()
  app.use(cors())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.get('/profiles', (req, res) => {
    const ids = String(req.query.ids ?? '')
      .split(',')
      .filter(Boolean)

    res.json({ items: profiles.filter((profile) => ids.includes(profile.id)) })
  })

  app.get('/stories', (_req, res) => {
    res.json({ items: stories })
  })

  return app
}
