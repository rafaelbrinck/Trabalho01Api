const ServidorRepository = require("../Repository/ServidorRepository")

function listar(){
    return ServidorRepository.listar();
}

function inserir(locacao){
    if(locacao && locacao.idJogo && locacao.idUsuario){
        return ServidorRepository.inserir(locacao);
    }else{
        throw { id: 400, msg: "Locação sem dados corretos"}
    }
}

function listarDescricoes(id) {
    let locacoes = ServidorRepository.listarDescricoes(id);
    if(locacoes) {
        return locacoes;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

function deletar(id) {
    let locacao = ServidorRepository.deletar(id);
    if(locacao) {
        return locacao;
    }
    else {
        throw { id: 404, msg: "Locação não encontrado!" }
    }
}


module.exports = {
    listar,
    inserir,
    listarDescricoes,
    deletar
}