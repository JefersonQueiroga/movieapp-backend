# 🎬 MovieApp Backend - API de Autenticação

Backend Node.js com Express, SQLite e JWT para o aplicativo MovieApp. Desenvolvido para fins educativos com foco em autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite** - Banco de dados local
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **cors** - Habilitar requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
movieapp-backend/
├── config/
│   └── database.js          # Configuração do Sequelize
├── models/
│   └── usuario.js           # Model do usuário
├── repositories/
│   └── usuarioRepository.js # Repository pattern
├── routes/
│   └── usuarios.js          # Rotas de autenticação
├── .env                     # Variáveis de ambiente
├── server.js               # Servidor principal
└── package.json            # Dependências
```

## Instalação e Configuração

### 1. Clone e instale dependências
```bash
git clone https://github.com/JefersonQueiroga/movieapp-backend.git
cd movieapp-backend
npm install
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```bash
PORT=3000
JWT_SECRET=movieapp-super-secret-key-change-in-production
```

### 3. Execute o servidor
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Endpoints da API

### **Autenticação**

#### **POST** `/api/usuarios/cadastro`
Cadastra um novo usuário.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Response (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **POST** `/api/usuarios/login`
Realiza login do usuário.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Gerenciamento de Usuários**

#### **GET** `/api/usuarios`
Lista todos os usuários (sem senhas).

#### **GET** `/api/usuarios/:id`
Busca usuário por ID.

#### **PUT** `/api/usuarios/:id`
Atualiza dados do usuário.

#### **DELETE** `/api/usuarios/:id`
Remove usuário.

### **Utilitários**

#### **GET** `/api/health`
Verifica se a API está funcionando.

**Response:**
```json
{
  "message": "MovieApp API funcionando!",
  "timestamp": "2024-07-02T10:30:00.000Z"
}
```


## 🛠️ Scripts Disponíveis

```bash
# Iniciar servidor com nodemon (desenvolvimento)
npm start

# Instalar dependências
npm install
```

## 🧪 Testando a API

### **Com cURL**

**Cadastro:**
```bash
curl -X POST http://localhost:3000/api/usuarios/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "123456"
  }'
```

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

## 🗄️ Banco de Dados

### **SQLite**
- Arquivo: `database.sqlite` (criado automaticamente)
- Sincronização automática das tabelas
- Ideal para desenvolvimento e testes

### **Tabela: usuarios**
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```




