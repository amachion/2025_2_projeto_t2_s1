const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())

//endpoint para atender uma requisição GET, que responde "oi"
app.get("/oi", (req, res) => {
  res.send("oi");
});

let filmes = [
  {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse:
      "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
  },
  {
    titulo: "Um Sonho de Liberdade",
    sinopse:
      "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
  },
];

//endpoint para devolver a lista de filmes: get /filmes

app.get('/filmes', (req, res) => {
    res.send(filmes)
})

//endpoint para cadastrar novo filme NA MEMÓÓÓRIA do navegador
app.post('/filmes', (req, res) => {
  //montar o objeto JSON com as informações enviadas
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  const filme = {titulo: titulo, sinopse: sinopse}
  //inserir na lista de filmessss o filme novo
  filmes.push(filme)
  //só para verificar 
  res.send(filmes)
})

app.listen(3000, () => {
  console.log("server up and running");
});
