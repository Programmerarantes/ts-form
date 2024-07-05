import { useEffect, useState } from "react"
import { User } from '../models/User'
import { Link, useNavigate } from 'react-router-dom'
import {Table, Button, Space, Modal, Form, Input, Select, DatePicker, message} from 'antd'
import api from '../services/api'
import type { TableProps } from 'antd';
import moment from 'moment';

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [nameFilter, setNameFilter] = useState<string>('')
    const [cpfFilter, setCpfFilter] = useState<string>('')
    

    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => { 
        const fetchUsers = async () => {
            try {
                const response = await api.get<User[]>('/users')
                setUsers(response.data)
            } catch (error) {
                message.error('Erro ao carregar dados')
                console.log('Erro ao carregar dados')
            }
        }

        fetchUsers()
    }, []);

    const handleEdit = (user: User) => {
        console.log('Dados originais do usuário:', user)
        setSelectedUser(user)
        setModalVisible(true)

        const formattedDate = moment(user.data_nasc).format('DD/MM/YYYY')

        form.setFieldsValue({
            ...user,
            data_nasc: formattedDate ? moment(formattedDate, 'DD/MM/YYYY') : null
        })
    }

    const handleFinishUpdate = async (values: User) => {
        if (!selectedUser) return

        try {
            const response = await api.put<User>(`http://localhost:4000/users/${selectedUser.id}`, values)
            console.log(response.data)
            setUsers(users.map(user => (user.id === selectedUser.id ? response.data: user)))
            setModalVisible(false)
            navigate('/')
            message.success("Usuário atualizado com sucesso")
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
            message.error('Erro ao atualizar usuário')
        }
    }
     
    const handleDelete = async (id: number) => {
        try {
            const response = await api.delete(`users/${id}`)
            console.log(response)   
            setUsers(users.filter(user => user.id !== id))
            message.success("Usuário deletado com sucesso")
        } catch (error) {
            message.error("Erro ao deletar usuário")
        }
    }

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            title: "Confirmação",
            content: "Tem certeza que deseja excluir o usuário?",
            okText: "Sim",
            cancelText: "Não",
            onOk: () => handleDelete(id),
            onCancel: () => setSelectedUser(null)
        })
    }

    const filteredUsers = users.filter(user => {
    // Verifica se user.nome não é undefined ou null antes de chamar toLowerCase()
    const nomeLowerCase = user.nome ? user.nome.toLowerCase() : '';

    // Verifica se user.cpf não é undefined ou null antes de chamar includes()
    const cpfIncludes = user.cpf ? user.cpf.includes(cpfFilter) : false;

    return nomeLowerCase.includes(nameFilter.toLowerCase()) && cpfIncludes;
});
    const columns: TableProps<User>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key:'nome'
        },
        {
            title: "CPF",
            dataIndex: 'cpf',
            key:'cpf'
        },
        {
            title: "RG",
            dataIndex: 'rg',
            key:'rg'
        },
        {
            title: "Data de Nascimento",
            dataIndex: 'data_nasc',
            key:'data_nasc',
            render: (date) => {
                const formattedDate = new Date(date)
                const day = formattedDate.getDate();
                const month = formattedDate.getMonth() + 1;
                const year = formattedDate.getFullYear();
      
                return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
            }

        },
        {
            title: "Sexo",
            dataIndex: 'sexo',
            key:'sexo'
        },
        {
            title: 'Ações',
            key: 'ações',
            render : (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleEdit(record)}>
                        Editar
                    </Button>
                    <Button type='primary' danger onClick={() => showDeleteConfirm(record.id)}>
                        Deletar
                    </Button>
                </Space>
            ),
        },
    ]


    return (
        <>
            <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', marginTop: 25}}>
                <Input
                    placeholder="Filtrar por nome"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                />
                <Input
                    placeholder="Filtrar por cpf"
                    value={cpfFilter}
                    onChange={e => setCpfFilter(e.target.value)}
                />
            </Space>
            <Button type="primary">
                <Link to='/create'>Novo Usuário</Link>
            </Button>
            <Table dataSource={filteredUsers} columns={columns}/>
            <Modal
                title="Editar Usuário"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleFinishUpdate}
        >
          <Form.Item name="nome" label="Nome">
                <Input />
            </Form.Item>
            <Form.Item name="cpf" label="CPF">
                <Input />
            </Form.Item>
            <Form.Item name="rg" label="RG">
                <Input />
            </Form.Item>
            <Form.Item name="data_nasc" label="Data de Nascimento">
                <DatePicker style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item name="sexo" label="Sexo">
                <Select 
                options={[
                    { value: 'Masculino', label: 'Masculino'},
                    { value: 'Feminino', label: 'Feminino'},
                    { value: 'Outros', label: 'Outros'}
                ]}
                        />
            </Form.Item>
        </Form>
      </Modal>
        </>
    )
}

export default UserTable