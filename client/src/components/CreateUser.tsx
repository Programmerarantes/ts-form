import React from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import { User } from '../models/User'
import moment from 'moment'

const dateFormat = 'DD/MM/YYYY';

export const CreateUser: React.FC = () => {
  
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinishCreate = async (values: User) => {
    try {
      const formattedValues = {
        ...values,
        data_nasc: moment(values.data_nasc).format(dateFormat),
      }
      console.log(formattedValues)
      await api.post('http://localhost:4000/users', formattedValues)
      form.resetFields()
      navigate('/')
      message.success("Usuário cadastrado com sucesso")
      console.log(values)
    } catch (error) {
      console.log("Erro ao enviar dados", error)
      message.error("Erro ao cadastrar usuário")
    }
  }

  return (
    <Form
      name="form"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishCreate}
      autoComplete='off'
    >
      <Form.Item
        label="Nome"
        name="nome"
        key='nome'
        rules={[
          {
            required: true,
            message: 'Insira seu nome'
          },
          {
            pattern: /^[a-zA-ZÀ-ÿ\s]*$/,
            message: "Nome deve conter apenas letras e espaços"
          },
          {
            max: 50,
            message: "O nome deve ter no máximo 50 caracteres"
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="CPF"
        name="cpf"
        key='cpf'
        rules={[
          {
            required: true,
            message: 'Insira seu CPF'
          },
          {
            pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
            message: 'Formato inválido de CPF. Use 000.000.000-00'
          },
          {
            max: 14,
            message: 'O CPF deve ter no máximo 11 números'
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="RG"
        name="rg"
        key='rg'
        rules={[
          {
            required: true,
            message: 'Insira seu RG'
          },
          {
            pattern: /^\d{2}\.\d{3}\.\d{3}\-\d{1}$/,
            message: 'Formato inválido de RG. Use 00.000.000-0'
          },
          {
            max: 12,
            message: 'O RG deve ter no máximo 9 números'
          }
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        key='data_nasc'
        label="Data de Nascimento"
        name="data_nasc"
        rules={[{ required: true, message: 'Insira sua data de nascimento' }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item
        key='sexo'
        label="Sexo"
        name="sexo"
        rules={[{ required: true, message: 'Selecione seu sexo' }]}
      >
        <Select
          defaultValue="Sexo"
          style={{ width: 120 }}
          options={[
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Feminino', label: 'Feminino' },
            { value: 'Outros', label: 'Outros' }
          ]}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
