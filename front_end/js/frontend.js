const protocolo = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
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
  const filmesEndpoint = "/filmes";
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
async function cadastrarUsuario() {
  //1. posicionar nos campos de input do modal
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  //2. captura o que o usuário digitou
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    //cadastrar, utilizando uma uma estrutura try - catch
    try {
      //1. definir o endpoint
      const cadastroInput = '/signup'
      //2. montar a URL completa
      const URLcompleta = `${protocolo}${baseURL}${cadastroInput}`
      await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro})
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""
      let alert = document.querySelector('.alert-modal-cadastro')
      alert.innerHTML = "Usuário cadastrado com sucesso!"
      alert.classList.add('show', 'alert-success')
      alert.classList.remove('d-none', 'alert-danger')
      setTimeout(() => {
        alert.classList.add ('d-none')
        alert.classList.remove ('show')
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"))
        modalCadastro.hide()
      }, 2000)
    }
    catch (error) {
      //exibir o alerta que o usuário já existe
      let alert = document.querySelector('.alert-modal-cadastro')
      alert.innerHTML = "Usuário já existe!!!"
      alert.classList.add('show', 'alert-danger')
      alert.classList.remove('d-none')
      setTimeout(() => {
        alert.classList.add('d-none')
        alert.classList.remove('show', 'alert-danger')
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"))
        modalCadastro.hide()
      }, 2000)
    }
  }
  else {
    //exibir o alerta para digitar tudo
    let alert = document.querySelector('.alert-modal-cadastro')
    alert.innerHTML = "Preencha todos os campos"
    alert.classList.add('show', 'alert-danger')
    alert.classList.remove('d-none')
    setTimeout(() => {
      alert.classList.add('d-none')
      alert.classList.remove('show', 'alert-danger')
    }, 2000)
  }  
}
