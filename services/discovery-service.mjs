import cors from 'cors'
import express from 'express'
import { trends } from './domain.mjs'

export function createDiscoveryService() {
  const app = express()
  app.use(cors())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.get('/trends', (_req, res) => {
    res.json({ items: trends })
  })

  return app
}
