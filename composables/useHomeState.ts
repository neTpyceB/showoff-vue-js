import type { FeedItem, StoryItem, TrendItem } from '~/lib/feed-state'
import { applyFeedFilter, mergeFeedItems } from '~/lib/feed-state'

export function useHomeState() {
  const feed = useState<FeedItem[]>('feed-items', () => [])
  const stories = useState<StoryItem[]>('story-items', () => [])
  const trends = useState<TrendItem[]>('trend-items', () => [])
  const activeFilter = useState<'for-you' | 'following' | 'live'>('feed-filter', () => 'for-you')

  const visibleFeed = computed(() => applyFeedFilter(feed.value, activeFilter.value))

  function seed(payload: { feed: FeedItem[]; stories: StoryItem[]; trends: TrendItem[] }) {
    feed.value = mergeFeedItems(feed.value, payload.feed)
    stories.value = payload.stories
    trends.value = payload.trends
  }

  function prependLiveItem(item: FeedItem) {
    feed.value = mergeFeedItems(feed.value, [item])
  }

  return { feed, stories, trends, activeFilter, visibleFeed, seed, prependLiveItem }
}
