import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFile = path.join(__dirname, 'data.json')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body ?? {}
  const db = loadDb()
  const user = db.users.find((item) => item.email === email && item.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  return res.json({
    token: `token-${user.id}`,
    user: { id: user.id, name: user.name, email: user.email },
  })
})

app.get('/articles', (req, res) => {
  const { q = '', tag = '' } = req.query
  const query = String(q).toLowerCase().trim()
  const selectedTag = String(tag).toLowerCase().trim()

  const db = loadDb()
  const articles = db.articles.filter((article) => {
    const hitQuery =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some((item) => item.toLowerCase().includes(query))

    const hitTag = !selectedTag || article.tags.some((item) => item.toLowerCase() === selectedTag)
    return hitQuery && hitTag
  })

  res.json(articles.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)))
})

app.post('/articles', authGuard, (req, res) => {
  const { title = '', content = '', tags = [] } = req.body ?? {}
  const normalizedTitle = String(title).trim()
  if (!normalizedTitle) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const now = new Date().toISOString()
  const article = {
    id: crypto.randomUUID(),
    title: normalizedTitle,
    content: String(content),
    tags: normalizeTags(tags),
    authorId: req.userId,
    createdAt: now,
    updatedAt: now,
  }

  const db = loadDb()
  db.articles.unshift(article)
  saveDb(db)
  res.status(201).json(article)
})

app.put('/articles/:id', authGuard, (req, res) => {
  const { title = '', content = '', tags = [] } = req.body ?? {}
  const normalizedTitle = String(title).trim()
  if (!normalizedTitle) {
    return res.status(400).json({ message: 'Title is required' })
  }

  const db = loadDb()
  const article = db.articles.find((item) => item.id === req.params.id)
  if (!article) {
    return res.status(404).json({ message: 'Not found' })
  }

  article.title = normalizedTitle
  article.content = String(content)
  article.tags = normalizeTags(tags)
  article.updatedAt = new Date().toISOString()
  saveDb(db)

  res.json(article)
})

app.delete('/articles/:id', authGuard, (req, res) => {
  const db = loadDb()
  const next = db.articles.filter((item) => item.id !== req.params.id)
  if (next.length === db.articles.length) {
    return res.status(404).json({ message: 'Not found' })
  }

  db.articles = next
  saveDb(db)
  return res.status(204).send()
})

function authGuard(req, res, next) {
  const auth = req.headers.authorization ?? ''
  if (!auth.startsWith('Bearer token-')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  req.userId = auth.replace('Bearer token-', '')
  return next()
}

function loadDb() {
  const raw = fs.readFileSync(dataFile, 'utf8')
  return JSON.parse(raw)
}

function saveDb(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
}

function normalizeTags(tags) {
  return [...new Set((Array.isArray(tags) ? tags : []).map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))]
}

export default app
