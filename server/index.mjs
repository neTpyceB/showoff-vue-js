import { createGatewayService } from './gateway-service.mjs'

const port = Number(process.env.PORT ?? 3000)
const app = createGatewayService()

app.listen(port, () => {
  console.log(`Gateway listening on ${port}`)
})
