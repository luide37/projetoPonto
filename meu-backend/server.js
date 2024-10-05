// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas
const mongoURI = process.env.MONGODB_URI; // Aqui usamos a variável de ambiente

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Definir um esquema de usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('Usuário registrado com sucesso!');
  } catch (error) {
    res.status(400).send('Erro ao registrar o usuário: ' + error.message);
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).send('Usuário ou senha incorretos.');
    }
    res.send('Login bem-sucedido!');
  } catch (error) {
    res.status(500).send('Erro ao fazer login: ' + error.message);
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
