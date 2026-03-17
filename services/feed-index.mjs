import { createFeedService } from './feed-service.mjs'

const app = createFeedService()
const port = Number(process.env.PORT ?? 4101)

app.listen(port, () => {
  console.log(`Feed service listening on ${port}`)
})
