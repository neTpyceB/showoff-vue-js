import { describe, expect, it } from 'vitest'
import { applyFeedFilter, mergeFeedItems } from '../../lib/feed-state'

const base = [
  {
    id: '1',
    authorId: 'a',
    community: 'One',
    headline: 'First',
    excerpt: 'A',
    createdAt: '2026-03-17T10:00:00.000Z',
    momentum: 2,
    following: true,
    format: 'story' as const,
  },
  {
    id: '2',
    authorId: 'b',
    community: 'Two',
    headline: 'Second',
    excerpt: 'B',
    createdAt: '2026-03-17T11:00:00.000Z',
    momentum: 3,
    following: false,
    format: 'live' as const,
  },
]

describe('feed state helpers', () => {
  it('deduplicates and sorts newest first', () => {
    const merged = mergeFeedItems([base[0]!], [base[1]!, base[0]!])
    expect(merged.map((item) => item.id)).toEqual(['2', '1'])
  })

  it('filters following and live lanes correctly', () => {
    expect(applyFeedFilter(base, 'following').map((item) => item.id)).toEqual(['1'])
    expect(applyFeedFilter(base, 'live').map((item) => item.id)).toEqual(['2'])
  })
})
