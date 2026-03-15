import app from './app.mjs'

const port = Number(process.env.PORT ?? 3000)
app.listen(port, () => {
  console.log(`Knowledge API listening on ${port}`)
})
