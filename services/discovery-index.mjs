import { createDiscoveryService } from './discovery-service.mjs'

const app = createDiscoveryService()
const port = Number(process.env.PORT ?? 4103)

app.listen(port, () => {
  console.log(`Discovery service listening on ${port}`)
})
