export interface FeedItem {
  id: string
  authorId: string
  community: string
  headline: string
  excerpt: string
  createdAt: string
  momentum: number
  following: boolean
  format: 'story' | 'video' | 'live'
}

export interface StoryItem {
  id: string
  title: string
  viewers: string
}

export interface TrendItem {
  id: string
  label: string
  volume: string
}

export function mergeFeedItems(current: FeedItem[], incoming: FeedItem[]) {
  const map = new Map<string, FeedItem>()

  for (const item of [...incoming, ...current]) {
    map.set(item.id, item)
  }

  return [...map.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function applyFeedFilter(items: FeedItem[], filter: 'for-you' | 'following' | 'live') {
  if (filter === 'following') {
    return items.filter((item) => item.following)
  }

  if (filter === 'live') {
    return items.filter((item) => item.format === 'live' || item.format === 'video')
  }

  return items
}
