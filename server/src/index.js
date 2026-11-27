import express from 'express'
import healthRouter from './routes/health.js'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use('/api', healthRouter)

app.listen(port, () => {
  console.log(`API Node.js disponible sur http://localhost:${port}`)
})