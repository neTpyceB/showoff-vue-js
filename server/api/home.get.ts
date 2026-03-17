import { collectHomeSnapshot } from '~/lib/home-snapshot'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return collectHomeSnapshot({
    feedServiceUrl: config.feedServiceUrl,
    profileServiceUrl: config.profileServiceUrl,
    discoveryServiceUrl: config.discoveryServiceUrl,
  })
})
