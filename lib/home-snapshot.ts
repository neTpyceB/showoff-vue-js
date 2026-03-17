import { mergeFeedItems } from './feed-state'
import type { FeedItem, StoryItem, TrendItem } from './feed-state'

interface ProfileItem {
  id: string
  name: string
  role: string
}

export interface HomeSnapshot {
  feed: Array<FeedItem & { author?: ProfileItem }>
  stories: StoryItem[]
  trends: TrendItem[]
  stats: {
    activeReaders: string
    liveRooms: string
    cacheHitRate: string
  }
}

export async function collectHomeSnapshot(options: {
  feedServiceUrl: string
  profileServiceUrl: string
  discoveryServiceUrl: string
}): Promise<HomeSnapshot> {
  const [feed, stories, trends] = await Promise.all([
    fetchJson<{ items: FeedItem[] }>(`${options.feedServiceUrl}/timeline`),
    fetchJson<{ items: StoryItem[] }>(`${options.profileServiceUrl}/stories`),
    fetchJson<{ items: TrendItem[] }>(`${options.discoveryServiceUrl}/trends`),
  ])

  const authorIds = [...new Set(feed.items.map((item) => item.authorId))].join(',')
  const profiles = await fetchJson<{ items: ProfileItem[] }>(
    `${options.profileServiceUrl}/profiles?ids=${encodeURIComponent(authorIds)}`,
  )
  const profileMap = new Map<string, ProfileItem>(profiles.items.map((item) => [item.id, item]))

  return {
    feed: mergeFeedItems([], feed.items).map((item) => ({
      ...item,
      author: profileMap.get(item.authorId),
    })),
    stories: stories.items,
    trends: trends.items,
    stats: {
      activeReaders: '14.2m',
      liveRooms: '1.3k',
      cacheHitRate: '96.8%',
    },
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Upstream ${response.status}`)
  }

  return response.json() as Promise<T>
}
