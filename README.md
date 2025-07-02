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
git clone <url-do-repositorio>
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

### **Com REST Client (VS Code)**
Crie um arquivo `tests.http`:
```http
### Health Check
GET http://localhost:3000/api/health

### Cadastro
POST http://localhost:3000/api/usuarios/cadastro
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}

### Login
POST http://localhost:3000/api/usuarios/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
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

## 🔧 Troubleshooting

### **Porta já em uso**
```bash
# Verificar o que está usando a porta 3000
lsof -i :3000

# Ou mude a porta no .env
PORT=3001
```

### **Erro de CORS**
Certifique-se que `app.use(cors())` está no `server.js`.

### **Database não sincroniza**
Verifique se o arquivo `database.sqlite` tem permissões de escrita.

### **JWT Secret não definido**
Certifique-se que o arquivo `.env` existe e tem `JWT_SECRET`.

## 🚀 Deploy (Opcional)

### **Heroku**
```bash
# Instalar Heroku CLI e fazer login
heroku create movieapp-backend
git push heroku main

# Configurar variáveis de ambiente
heroku config:set JWT_SECRET=your-production-secret-here
```

### **Railway/Render**
- Conecte seu repositório Git
- Configure as variáveis de ambiente
- Deploy automático

## 🤝 Integração com Frontend

### **React Native/Expo**
```typescript
const BASE_URL = 'http://localhost:3000/api'; // Desenvolvimento
// const BASE_URL = 'https://sua-api.herokuapp.com/api'; // Produção

const response = await fetch(`${BASE_URL}/usuarios/cadastro`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, email, senha })
});
```

### **Emulador Android**
Use `http://10.0.2.2:3000/api` em vez de `localhost`.

