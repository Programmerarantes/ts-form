require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'matheus123',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
})

module.exports = pool