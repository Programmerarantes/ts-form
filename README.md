# 📝 Projeto Fullstack de CRUD de Usuários

Este repositório contém uma aplicação fullstack de gerenciamento de usuários, construída com uma arquitetura RESTful e dividida em duas partes:

- **Frontend**: Desenvolvido com React, TypeScript e AntD.
- **Backend**: API RESTful construída com Node.js e Express para gerenciar dados dos usuários.

## 📌 Funcionalidades

- **Cadastro de Usuários**: Permite criar novos usuários com dados pessoais.
- **Leitura de Usuários**: Visualiza a lista de usuários cadastrados.
- **Atualização de Usuários**: Edita informações de um usuário específico.
- **Exclusão de Usuários**: Remove usuários do sistema.

---

## 🚀 Tecnologias Utilizadas

### client
- **React** + **TypeScript**
- **Ant Design** para componentes de UI
- **Axios** para requisições HTTP
- **Vite** como bundler


### server
- **Node.js** + **Express**
- **PostgreSQL** para armazenamento de dados
- **Jest** e **Vitest** para testes
- **Docker** para ambiente de desenvolvimento (opcional)

---
## 🛠️ Pré-requisitos

Certifique-se de ter instalado:

Node.js
Docker (opcional, para facilitar a configuração do ambiente)
PostgreSQL

## 🔧 Configuração e Instalação
Clonando o Repositório

git clone https://github.com/Programmerarantes/ts-form
cd ts-form

Configurando o Backend

cd .\server\

Instale as dependências:

npm install

Configure as variáveis de ambiente:

Crie um arquivo .env na pasta backend com o conteúdo abaixo:

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco_de_dados
Execute o servidor de desenvolvimento:


npm start

(Opcional) Para rodar os testes:


npm test

Configurando o Frontend

cd .\client\
Instale as dependências:


npm install

Inicie o servidor de desenvolvimento:

npm run dev

## 🖥️ Uso da Aplicação
Abra seu navegador e acesse http://localhost:5173 para ver a interface do frontend.
O backend estará disponível em http://localhost:4000 para receber requisições RESTful.

## 🧪 Testes
A aplicação possui testes para garantir a qualidade e funcionamento da API.

Rodando Testes Unitários
Backend: npm test dentro da pasta server.

Frontend: Use npm test dentro da pasta client (necessário configurar Vitest ou Jest).

📝 API Endpoints
Usuários
GET /users: Retorna a lista de usuários.
POST /users: Cria um novo usuário.
PUT /users/:id: Atualiza um usuário existente.
DELETE /users/:id: Deleta um usuário existente.


## 📦 Estrutura do Projeto

```plaintext
📂 ts-form
├── 📁 client      # Código do frontend
│   ├── public       # Arquivos públicos
│   ├── src          # Código-fonte React
│   └── ...
├── 📁 server       # Código do backend
│   ├── controllers  # Lógica das rotas e handlers
│   ├── db           # Configuração de banco de dados
│   ├── queries      # Funções de consulta ao banco de dados
│   └── tests        # Testes unitários
└── README.md        # Documentação

