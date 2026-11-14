import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: new URL('../.env', import.meta.url) })

const isTest = process.env.DB_ENVIRONMENT === 'test'
const prefix = isTest ? 'TEST_DB_' : 'DEV_DB_'

const pool = new pg.Pool({
  host: process.env[`${prefix}HOST`],
  user: process.env[`${prefix}USER`],
  password: process.env[`${prefix}PASSWORD`],
  database: process.env[`${prefix}NAME`],
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
})

export { pool }
