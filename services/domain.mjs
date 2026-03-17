export const feedItems = [
  {
    id: 'post-1',
    authorId: 'author-1',
    community: 'Creator Economy',
    headline: 'Short-form commerce overtakes desktop conversion in southeast markets',
    excerpt: 'Regional creators pushed live checkout volume past desktop for the third week in a row.',
    createdAt: '2026-03-17T10:00:00.000Z',
    momentum: 92,
    following: true,
    format: 'story',
  },
  {
    id: 'post-2',
    authorId: 'author-2',
    community: 'Realtime Media',
    headline: 'Interactive live rooms cut churn in half for sports communities',
    excerpt: 'Product teams are packaging fan commentary, commerce, and highlights into one feed surface.',
    createdAt: '2026-03-17T09:00:00.000Z',
    momentum: 77,
    following: false,
    format: 'video',
  },
  {
    id: 'post-3',
    authorId: 'author-3',
    community: 'Platform Ops',
    headline: 'Edge cache tuning saves 34% origin cost during creator launches',
    excerpt: 'Route-level stale-while-revalidate wins show up fastest on aggregate home snapshots.',
    createdAt: '2026-03-17T08:00:00.000Z',
    momentum: 69,
    following: true,
    format: 'live',
  },
]

export const liveItem = {
  id: 'post-live-1',
  authorId: 'author-4',
  community: 'Breaking Feed',
  headline: 'Live now: creator fundraiser spikes into the top watchlist lane',
  excerpt: 'The realtime transport injects this card after first paint without invalidating the whole page.',
  createdAt: '2026-03-17T10:05:00.000Z',
  momentum: 99,
  following: true,
  format: 'live',
}

export const profiles = [
  { id: 'author-1', name: 'Nora Hale', role: 'Commerce analyst' },
  { id: 'author-2', name: 'Mika Tan', role: 'Live systems editor' },
  { id: 'author-3', name: 'Rin Sol', role: 'Platform architect' },
  { id: 'author-4', name: 'Jules Carter', role: 'Realtime producer' },
]

export const stories = [
  { id: 'story-1', title: 'Launch Room', viewers: '48k' },
  { id: 'story-2', title: 'Creator Briefing', viewers: '11k' },
  { id: 'story-3', title: 'Sports Wrap', viewers: '92k' },
]

export const trends = [
  { id: 'trend-1', label: '#edge-rendering', volume: '1.2M posts' },
  { id: 'trend-2', label: '#live-commerce', volume: '860k posts' },
  { id: 'trend-3', label: '#video-clips', volume: '420k posts' },
]
