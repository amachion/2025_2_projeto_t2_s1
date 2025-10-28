const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

// let filmes = [
//   {
//     titulo: "Forrest Gump - O Contador de Histórias",
//     sinopse:
//       "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
//   },
//   {
//     titulo: "Um Sonho de Liberdade",
//     sinopse:
//       "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
//   },
// ];

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
