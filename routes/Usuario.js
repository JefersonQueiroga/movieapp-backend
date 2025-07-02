const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repositories/UsuarioRepository');
const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Cadastro de usuário
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: 'Nome, email e senha são obrigatórios'
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        error: 'Senha deve ter pelo menos 6 caracteres'
      });
    }

    const usuarioExistente = await usuarioRepository.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({
        error: 'Email já está em uso'
      });
    }

    const usuario = await usuarioRepository.create({ nome, email, senha });
    const token = generateToken(usuario.id);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      usuario,
      token
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    const usuario = await usuarioRepository.validatePassword(email, senha);
    if (!usuario) {
      return res.status(401).json({
        error: 'Email ou senha incorretos'
      });
    }

    const token = generateToken(usuario.id);

    res.json({
      message: 'Login realizado com sucesso',
      usuario,
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar todos os usuários (desenvolvimento)
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioRepository.findAll();
    res.json({ usuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await usuarioRepository.findById(req.params.id);
    if (usuario) {
      res.json({ usuario });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const usuario = await usuarioRepository.update(req.params.id, req.body);
    if (usuario) {
      res.json({ usuario });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await usuarioRepository.remove(req.params.id);
    if (usuario) {
      res.json({ usuario });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;