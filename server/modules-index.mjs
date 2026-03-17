import { createModuleService } from './module-service.mjs'

const port = Number(process.env.PORT ?? 3002)
const app = createModuleService()

app.listen(port, () => {
  console.log(`Module service listening on ${port}`)
})
