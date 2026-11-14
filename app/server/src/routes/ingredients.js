import { Router } from 'express'
import { pool } from '../../db/db.js'

const router = Router()

// GET /api/ingredients
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name FROM ingredients ORDER BY name')
  res.json(rows)
})

// GET /api/ingredients/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Ingredient id must be a number' })

  const { rows } = await pool.query('SELECT id, name FROM ingredients WHERE id = $1', [id])
  if (!rows.length) return res.status(404).json({ error: 'Ingredient not found' })
  res.json(rows[0])
})

export default router
