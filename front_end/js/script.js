const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async function obtemFilmes() {
    // console.log ("teste")
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    //console.log(filmes);
    //posicionar no elemnto tabela da página
    let tabela = document.querySelector('.filmes')
    //posicionar no tbody:
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    //varrer o vetor de filmes
    for (let filme of filmes) {
        //inserir uma linha na tabela, na primeira posição:
        let linha = corpoTabela.insertRow(0)
        //caso queira no final, usar o insert sem parâmetro
        //insere uma coluna para cada elemento do filme
        let colunaTitulo = linha.insertCell(0)
        let colunaSinopse = linha.insertCell(1)
        colunaTitulo.innerHTML = filme.titulo
        colunaSinopse.innerHTML = filme.sinopse
    }
}