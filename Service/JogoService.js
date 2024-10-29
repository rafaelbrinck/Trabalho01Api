const JogoRepository = require('../Repository/JogoRepository')


function Listar(){
    return JogoRepository.Listar();
}

function Inserir(jogo){
    if(jogo && jogo.nome && jogo.categoria && jogo.preco){
        return JogoRepository.Inserir(jogo);
    }else{
        throw { id: 400, msg: "Jogo sem dados corretos"}
    }
}

function BuscarPorId(id) {
    let jogo = JogoRepository.BuscarPorId(id);
    if(jogo) {
        return jogo;
    }
    else {
        throw { id: 404, msg: "Jogo não encontrado!" }
    }
}

function Atualizar(id, jogo) {
    if(jogo && jogo.nome && jogo.categoria && jogo.preco && jogo.quantidade) {
        const JogoAtualizado = JogoRepository.Atualizar(id, jogo);
        if(JogoAtualizado) {
            return JogoAtualizado;
        }        
        else {
            throw {id:404, msg: "Jogo não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Jogo sem dados corretos"};
    }
}


function Deletar(id) {
    let jogo = JogoRepository.Deletar(id);
    if(jogo) {
        return jogo;
    }
    else {
        throw { id: 404, msg: "Jogo não encontrado!" }
    }
}

function BuscarPorCategoria(categoria) {
    let jogo = JogoRepository.BuscarPorCategoria(categoria);
    if(jogo) {
        return jogo;
    }
    else {
        throw { id: 404, msg: "Jogo não encontrado!" }
    }
}



module.exports = {
    Listar,
    Inserir,
    BuscarPorId,
    Atualizar,
    Deletar,
    BuscarPorCategoria
}
