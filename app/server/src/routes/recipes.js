import { Router } from 'express'
import { pool } from '../../db/db.js'
import { RECIPE_SELECT } from '../lib/queries.js'

const router = Router()

// GET /api/recipes
// GET /api/recipes?category=dinner   (category name, case-insensitive)
router.get('/', async (req, res) => {
  const { category } = req.query
  const { rows } = category
    ? await pool.query(`${RECIPE_SELECT} WHERE lower(c.name) = lower($1) ORDER BY r.title`, [category])
    : await pool.query(`${RECIPE_SELECT} ORDER BY r.title`)
  res.json(rows)
})

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Recipe id must be a number' })

  const { rows } = await pool.query(`${RECIPE_SELECT} WHERE r.id = $1`, [id])
  if (!rows.length) return res.status(404).json({ error: 'Recipe not found' })
  res.json(rows[0])
})

export default router
