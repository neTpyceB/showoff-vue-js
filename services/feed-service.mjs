import cors from 'cors'
import express from 'express'
import { feedItems, liveItem } from './domain.mjs'

export function createFeedService() {
  const app = express()
  app.use(cors())

  app.get('/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.get('/timeline', (_req, res) => {
    res.json({ items: feedItems })
  })

  app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()

    res.write(`event: feed-item\ndata: ${JSON.stringify(liveItem)}\n\n`)
    const heartbeat = setInterval(() => {
      res.write('event: heartbeat\ndata: ping\n\n')
    }, 15000)

    req.on('close', () => {
      clearInterval(heartbeat)
      res.end()
    })
  })

  return app
}
