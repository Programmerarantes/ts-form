const { createUserHandler } = require('../controllers/userController')
const { createUser } = require('../queries/userQueries')

jest.mock('../queries/userQueries', () => ({
    createUser: jest.fn(),
}))

describe('createUserHandler', () => {
    //caso de sucesso
    it('deve retornar um usuário criado com status 200', async () => {
        createUser.mockResolvedValue({
            id: 1,
            nome: 'User Test',
            cpf: '12345678900',
            rg: '1234567',
            data_nasc: '2000-01-01',
            sexo: 'Masculino',
        })

        const req = {
            body: {
                nome: 'User Test',
                cpf: '12345678900',
                rg: '1234567',
                data_nasc: '2000-01-01',
                sexo: 'Masculino',
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createUserHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            nome: 'User Test',
            cpf: '12345678900',
            rg: '1234567',
            data_nasc: '2000-01-01',
            sexo: 'Masculino',
        })
    })
    // erro de validação, faltando campo rg
    it('deve retornar erro 400 se algum campo estiver ausente', async () => {
        const req = {
            body: {
                nome: 'User Test',
                cpf: '12345678900',
                data_nasc: '2000-01-01',
                sexo: 'Masculino',
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createUserHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: 'Todos os campos são obrigatórios' })
    })

    //erro do servidor
    it('deve retornar erro 500 em caso de falha na criação', async () => {
        createUser.mockRejectedValue(new Error('Erro ao criar usuário'))

        const req = {
            body: {
                nome: 'User Test',
                cpf: '12345678900',
                data_nasc: '2000-01-01',
                rg: '1234567',
                sexo: 'Masculino',
            },
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await createUserHandler(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar usuário'})
    })
})