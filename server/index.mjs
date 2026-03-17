import { createRealtimeServer } from './realtime.mjs'

const port = Number(process.env.PORT ?? 3000)
const { server } = createRealtimeServer()
server.listen(port, () => {
  console.log(`Collaboration API listening on ${port}`)
})
