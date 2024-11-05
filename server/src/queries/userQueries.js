const pool = require('../db/db')
const logger = require('../utils/logger')

const getUsers = async () => {
    const q = 'SELECT * FROM users'
    try {
        const result = await pool.query(q)
        return result.rows
    } catch (err) {
        logger.error(`Erro ao obter usuários: ${err.message}`)
        throw new Error('Erro ao obter usuários')
    }
}

const createUser = async (nome, cpf, data_nasc, rg, sexo) => {
  const q = `INSERT INTO users (nome, cpf, data_nasc, rg, sexo) VALUES ($1, $2, $3, $4, $5) RETURNING id`
  try {
    const result = await pool.query(q, [nome, cpf, data_nasc, rg, sexo])
    return result.rows[0]
  } catch (err) {
    logger.error(`Erro ao criar usuário: ${err.message}`)
    throw new Error('Erro ao criar usuário')
  }
}

const updateUser = async (id, nome, cpf, rg, data_nasc, sexo) => {
  const q = `UPDATE users SET nome = $1, cpf = $2, rg = $3, data_nasc = $4, sexo = $5 WHERE id = $6 RETURNING id`
  try {
    const result = await pool.query(q, [nome, cpf, rg, data_nasc, sexo, id])
    return result.rows[0];
  } catch (err) {
    logger.error(`Erro ao atualizar usuário: ${err.message}`)
    throw new Error('Erro ao atualizar usuário')
  }
}

const deleteUser = async (id) => {
  const q = `DELETE FROM users WHERE id = $1`
  try {
    await pool.query(q, [id])
    return { message: 'Usuário deletado com sucesso' }
  } catch (err) {
    logger.error(`Erro ao deletar usuário: ${err.message}`)
    throw new Error('Erro ao deletar usuário')
  }
}

const countUsers = async () => {
  const q = `SELECT COUNT(*) FROM users;`
  try {
    const result = await pool.query(q)
    return { count: result.rows[0].count }
  } catch (err) {
    logger.error(`Erro ao contar usuários: ${err.message}`)
    throw new Error('Erro ao contar usuários')
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  countUsers,
}