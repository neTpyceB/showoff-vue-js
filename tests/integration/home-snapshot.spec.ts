import http from 'node:http'
import { afterEach, describe, expect, it } from 'vitest'
import { collectHomeSnapshot } from '../../lib/home-snapshot'
import { createDiscoveryService } from '../../services/discovery-service.mjs'
import { createFeedService } from '../../services/feed-service.mjs'
import { createProfileService } from '../../services/profile-service.mjs'

const servers: http.Server[] = []

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise((resolve, reject) => {
          server.close((error?: Error | null) => {
            if (error) reject(error)
            else resolve(undefined)
          })
        }),
    ),
  )
})

describe('home snapshot integration', () => {
  it('aggregates feed, profiles, stories, and trends from distributed services', async () => {
    const feed = await listen(createFeedService())
    const profile = await listen(createProfileService())
    const discovery = await listen(createDiscoveryService())
    const feedAddress = feed.address()
    const profileAddress = profile.address()
    const discoveryAddress = discovery.address()

    if (!feedAddress || typeof feedAddress === 'string') throw new Error('Feed port missing')
    if (!profileAddress || typeof profileAddress === 'string') throw new Error('Profile port missing')
    if (!discoveryAddress || typeof discoveryAddress === 'string') throw new Error('Discovery port missing')

    const snapshot = await collectHomeSnapshot({
      feedServiceUrl: `http://127.0.0.1:${feedAddress.port}`,
      profileServiceUrl: `http://127.0.0.1:${profileAddress.port}`,
      discoveryServiceUrl: `http://127.0.0.1:${discoveryAddress.port}`,
    })

    expect(snapshot.feed[0]?.author?.name).toBeTruthy()
    expect(snapshot.stories).toHaveLength(3)
    expect(snapshot.trends).toHaveLength(3)
  })
})

async function listen(app: Parameters<typeof http.createServer>[0]) {
  const server = http.createServer(app)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  servers.push(server)
  return server
}
