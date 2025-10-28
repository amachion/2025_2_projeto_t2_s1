const protocolo = "http://";
const baseURL = "localhost:3000";
const filmesEndpoint = "/filmes";

async function obtemFilmes() {
  // console.log ("teste")
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  //console.log(filmes);
  //posicionar no elemnto tabela da página
  let tabela = document.querySelector(".filmes");
  //posicionar no tbody:
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  //varrer o vetor de filmes
  for (let filme of filmes) {
    //inserir uma linha na tabela, na primeira posição:
    let linha = corpoTabela.insertRow(0);
    //caso queira no final, usar o insert sem parâmetro
    //insere uma coluna para cada elemento do filme
    let colunaTitulo = linha.insertCell(0);
    let colunaSinopse = linha.insertCell(1);
    colunaTitulo.innerHTML = filme.titulo;
    colunaSinopse.innerHTML = filme.sinopse;
  }
}

async function cadastrarFilme() {
  //monta a URL completa usando a crase
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  //se posicionar nos inputs
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  //pega o que o usuário digitou em cada um
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;
  if (titulo && sinopse) {
    //limpa as caixinhas de digitação
    tituloInput.value = "";
    sinopseInput.value = "";
    //envia a requisição para o servidor
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;
    //reconstruir a tabela de filmes
    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";
    //para cada filme, criar uma linha
    //para cada linha, duas colunas com título e sinopse
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0);
      let celulaTitulo = linha.insertCell(0);
      let celulaSinopse = linha.insertCell(1);
      celulaTitulo.innerHTML = filme.titulo;
      celulaSinopse.innerHTML = filme.sinopse;
    }
  }
  else {
    //exibir o alerta por até 2 segundos
    let alert = document.querySelector('.alert')
    alert.classList.add('show')
    alert.classList.remove('d-none')
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, 2000)
  }
}
