const UsuarioRepository = require("./UsuarioRepository");
const JogoRepository = require("./JogoRepository")

let listaServidor = [];
let idGerador = 1;



function listar(){
    return listaServidor;
}

function inserir(locacao){
    if(!locacao || !locacao.idJogo || !locacao.idUsuario){
        return
    }
    const usuario = UsuarioRepository.BuscarPorId(locacao.idUsuario)
    if(!usuario){
        throw { id: 404, msg: "Usuario não cadastrado!" };
    }
    const jogo = JogoRepository.BuscarPorId(locacao.idJogo)
    if(!jogo){
        throw { id: 404, msg: "Jogo não cadastrado!" };
    }
    jogo.quantidade -= 1
    JogoRepository.Atualizar(jogo.id, jogo)
    locacao.id = idGerador++;
    listaServidor.push(locacao);
    return locacao;
}

function listarDescricoes(id){
    if(!id){
        return
    }
    let locacoes = []
    const user =  UsuarioRepository.BuscarPorId(id)
    if(!user){
        return
    }
    listaServidor.forEach((servidor)=>{
        const jogo = JogoRepository.BuscarPorId(servidor.idJogo)
        user.valor += jogo.preco
    })
    UsuarioRepository.Atualizar(user.id, user)
    locacoes.push(user);
    listaServidor.forEach((locacao) =>{
        const jogo = JogoRepository.BuscarPorId(locacao.idJogo)
        jogo.quantidade = 1
        locacoes.push(jogo)
    })
    return locacoes

}

function buscarPorId(id){
    return (listaServidor.find( 
        function(locacao){
            return (locacao.id == id);
        }
    ));
}

function deletar(id){
    let IndiceServidor = listaServidor.findIndex(function(locacao) {
        return (locacao.id == id);
    })
    const Locacao = buscarPorId(id)
    const jogo = JogoRepository.BuscarPorId(Locacao.idJogo)
    if(IndiceServidor == -1) return;
    listaServidor.splice(IndiceServidor, 1)[0];

    return "Pagar: R$"+jogo.preco
}


module.exports = {
    listar,
    inserir,
    listarDescricoes,
    deletar
}