const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

async function findAll() {
  return await Usuario.findAll({
    attributes: { exclude: ['senha'] }
  });
}

async function findById(id) {
  return await Usuario.findByPk(id, {
    attributes: { exclude: ['senha'] }
  });
}

async function findByEmail(email) {
  return await Usuario.findOne({ 
    where: { email } 
  });
}

async function create({ nome, email, senha }) {
  const hashedSenha = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ 
    nome, 
    email, 
    senha: hashedSenha 
  });
  
  const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
  return usuarioSemSenha;
}

async function remove(id) {
  const user = await Usuario.findByPk(id);
  if (user) {
    await user.destroy();
    const { senha: _, ...usuarioSemSenha } = user.toJSON();
    return usuarioSemSenha;
  }
  return null;
}

async function update(id, { nome, email, senha }) {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    usuario.nome = nome;
    usuario.email = email;
    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }
    await usuario.save();
    
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    return usuarioSemSenha;
  }
  return null;
}

async function validatePassword(email, senha) {
  const usuario = await findByEmail(email);
  if (usuario && await bcrypt.compare(senha, usuario.senha)) {
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    return usuarioSemSenha;
  }
  return null;
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
  validatePassword,
};
