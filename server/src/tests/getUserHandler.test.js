const { getUsersHandler } = require('../controllers/userController')
const pool = require('../db/db')
const logger = require('../utils/logger')


jest.mock('../db/db', () => ({
  query: jest.fn(),
}));
jest.mock('../utils/logger', () => ({
  error: jest.fn(),
}));

describe('getUsersHandler', () => {
  it('deve retornar uma lista de usuários com status 200', async () => {

    pool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'User Test' }],
    });

    const req = {}
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
    }

    await getUsersHandler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'User Test' }])
  });

  it('deve retornar um erro 500 em caso de falha na consulta', async () => {

    pool.query.mockRejectedValue(new Error('Erro na consulta'))

    const req = {}; 
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
    }

    await getUsersHandler(req, res);

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Erro ao obter usuários'))

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao obter usuários' })
  });
});
