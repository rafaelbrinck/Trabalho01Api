let listaJogos = [];
let idGerador = 1;

function Listar(){
    return listaJogos;
}

function Inserir(jogo){
    if(!jogo || !jogo.nome || !jogo.categoria || !jogo.preco){
        return;
    }
    jogo.id = idGerador++;
    listaJogos.push(jogo);
    return jogo;
}

function BuscarPorId(id){
    return (listaJogos.find( 
        function(jogo){
            return (jogo.id == id);
        }
    ));
}

function Atualizar(id, jogo){
    if(!jogo || !jogo.nome || !jogo.categoria || !jogo.preco){
        return;
    }
    let IndiceJogo = listaJogos.findIndex(
        function(jogo){
            return (jogo.id == id);
        }
    )

    if(IndiceJogo == -1) return;
    jogo.id = id;
    listaJogos[IndiceJogo] = jogo;
    return jogo;
}

function Deletar(id){
    let IndiceJogo = listaJogos.findIndex(function(jogo) {
        return (jogo.id == id);
    })
    if(IndiceJogo == -1) return;
    return (listaJogos.splice(IndiceJogo, 1))[0];
}

function PesquisarPorCategoria(categoria) {
    return listaJogos.filter( (jogo) => jogo.categoria == categoria )
}




module.exports = {
    Listar,
    Inserir,
    Atualizar,
    BuscarPorId, 
    Atualizar,
    Deletar,
    PesquisarPorCategoria

}