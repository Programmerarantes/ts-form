/*testando joi para validação de dados no back-end

const Joi = require('joi')

const userSchema = Joi.object({
  nome: Joi.string()
  .alphanum()
  .min(3)
  .max(50)
  .required(),

  cpf: Joi.string()
  .length(11)
  .pattern(/^[0-9]+$/)
  .required(),

  rg: Joi.string()
  .pattern(/^[0-9]+$/)
  .required(),

  data_nasc: Joi.date()
  .required(),

  sexo: Joi.string()
  .valid('Masculino', 'Feminino', 'Outros')
  .required()


})

const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

*/
//testando winston para registrar erros internos

const winston = require('winston')

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console(),
  ],
})
const Pool = require('pg').Pool

//criar um dotenv?

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'matheus123',
  database: 'postgres',
  port: 5432,
})

const getUsers = (_, res) => {
  const q = "SELECT * FROM users;";

  pool.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.rows);
  });
};

//Injeção de SQL ?

const createUser = (req, res) => {
  const { nome, cpf, data_nasc, rg, sexo } = req.body

  if (!nome || !cpf || !data_nasc || !rg || !sexo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  const q = `INSERT INTO users (nome, cpf, data_nasc, rg, sexo) VALUES ($1, $2, $3, $4, $5) RETURNING id`

  pool.query(q, [nome, cpf, data_nasc, rg, sexo], (err, data) => {
    if (err) {
      logger.error(`Erro ao criar usuário: ${err.message}`);
      return res.status(500).json({ error: 'Erro ao criar usuário' })
    }
    return res.status(200).json(data.rows);
  })
}

const updateUser = (req, res) => {
  const { nome, cpf, rg, data_nasc, sexo } = req.body;
  const q = `UPDATE users SET nome = $1, cpf = $2, rg = $3, data_nasc = $4, sexo = $5 WHERE id = $6 RETURNING id`

  pool.query(q, [nome, cpf, rg, data_nasc, sexo, req.params.id], (err, data) => {
    console.log("Erro ao atualizar usuário: ", err)
    if (err) return res.status(500).json(err)

    return res.status(200).json(data.rows)
  })
};

const deleteUser = (req, res) => {
  const q = `DELETE FROM users WHERE id = $1`

  pool.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json({})
  })
}

const countUsers = (_, res) => {
  const q = `SELECT COUNT(*) FROM users;`;

  pool.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    const count = data.rows[0].count;
    return res.status(200).json({ count });
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  countUsers
}