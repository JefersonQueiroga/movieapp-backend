const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const usuariosRoutes = require('./routes/Usuario');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});

// Rotas
app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'MovieApp API funcionando!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});