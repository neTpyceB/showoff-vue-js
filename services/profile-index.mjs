import { createProfileService } from './profile-service.mjs'

const app = createProfileService()
const port = Number(process.env.PORT ?? 4102)

app.listen(port, () => {
  console.log(`Profile service listening on ${port}`)
})
