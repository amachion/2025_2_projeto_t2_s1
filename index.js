const express = require("express");
const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log("server up and running");
});
