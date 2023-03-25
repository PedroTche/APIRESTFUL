// config inicial
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// forma de ler JSON / middlewares
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar req
  res.json({ message: 'Oi Express!' });
});

// entragar uma porta
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@jwtauth.f281lnq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectou ao banco!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
