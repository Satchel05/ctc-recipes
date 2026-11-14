import { Router } from 'express'
import { pool } from '../../db/db.js'

const router = Router()

// GET /api/categories
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name FROM recipe_categories ORDER BY name')
  res.json(rows)
})

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Category id must be a number' })

  const { rows } = await pool.query('SELECT id, name FROM recipe_categories WHERE id = $1', [id])
  if (!rows.length) return res.status(404).json({ error: 'Category not found' })
  res.json(rows[0])
})

export default router
