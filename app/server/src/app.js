import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import recipesRouter from './routes/recipes.js'
import cuisinesRouter from './routes/cuisines.js'
import categoriesRouter from './routes/categories.js'
import ingredientsRouter from './routes/ingredients.js'

dotenv.config({ path: new URL('../.env', import.meta.url) })

const app = express()
app.use(cors())
app.use(express.json())

// Read-only guard: only GET (plus HEAD/OPTIONS) requests are allowed.
app.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()
  res.set('Allow', 'GET').status(405).json({ error: 'This API is read-only' })
})

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/recipes', recipesRouter)
app.use('/api/cuisines', cuisinesRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/ingredients', ingredientsRouter)

// Anything not matched above
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// Errors thrown in async routes end up here (Express 5 does this automatically)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

export default app
