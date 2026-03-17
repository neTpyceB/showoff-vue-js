import { createAuthService } from './auth-service.mjs'

const port = Number(process.env.PORT ?? 3001)
const app = createAuthService()

app.listen(port, () => {
  console.log(`Auth service listening on ${port}`)
})
