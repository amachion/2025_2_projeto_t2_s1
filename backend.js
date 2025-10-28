const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require("bcrypt")
const app = express();
app.use(express.json());
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

//endpoint para devolver a lista de filmes: get /filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//endpoint para cadastrar novo filme NA MEMÓÓÓRIA do navegador
app.post('/filmes', async (req, res) => {
  //montar o objeto JSON com as informações enviadas
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  //montar o filme de acordo com o schema definido, ou seja, um objeto da classe Filme
  const filme = new Filme({titulo: titulo, sinopse: sinopse})
  //salvar no banco
  await filme.save()
  const filmes = await Filme.find()
  res.json(filmes)
})

app.post('/signup', async (req, res) => {
  try {
    //captura informação que o usuário digitou
    const login = req.body.login
    const password = req.body.password
    //vamos encriptar a senha
    const passwordCriptografada = await bcrypt.hash(password, 10)
    //monta o objeto json
    const usuario = new Usuario({login: login, password: passwordCriptografada})
    //envia para o banco
    const respostaMongo = await usuario.save()
    console.log(respostaMongo)
    res.status(201).end()
  }
  catch (exception) {
    console.log(exception);
    res.status(409).end()
  }
})



const stringConexao = process.env.CONEXAO_DB

async function conectarAoMongoDB () {
  await mongoose.connect(stringConexao)
}

app.listen(3000, () => {
  try {
    conectarAoMongoDB()
    console.log("server up and running and connection ok");
  }
  catch (e) {
    console.log('erro: ' + e)
  }
});
