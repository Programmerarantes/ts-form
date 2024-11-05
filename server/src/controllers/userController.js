const { getUsers, createUser, updateUser, deleteUser, countUsers } = require('../queries/userQueries')

const getUsersHandler = async (_, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const createUserHandler = async (req, res) => {
  const { nome, cpf, data_nasc, rg, sexo } = req.body

  if (!nome || !cpf || !data_nasc || !rg || !sexo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  try {
    const user = await createUser(nome, cpf, data_nasc, rg, sexo)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const updateUserHandler = async (req, res) => {
  const { nome, cpf, rg, data_nasc, sexo } = req.body

  try {
    const updatedUser = await updateUser(req.params.id, nome, cpf, rg, data_nasc, sexo)
    return res.status(200).json(updatedUser)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const deleteUserHandler = async (req, res) => {
  try {
    const message = await deleteUser(req.params.id)
    return res.status(200).json(message)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const countUsersHandler = async (_, res) => {
  try {
    const count = await countUsers()
    return res.status(200).json(count)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  countUsersHandler,
}