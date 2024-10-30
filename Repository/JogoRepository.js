let listaJogos = [];
let idGerador = 1;

function resetState() {
    listaJogos.length = 0;
    idGerador = 1;
};

// função para redefinir o estado da lista e do idGerador
function Listar() {
    return listaJogos;
}


function Inserir(jogo) {
    if (!jogo || !jogo.nome || !jogo.categoria || !jogo.preco || !jogo.quantidade) {
        throw { id: 400, msg: "Dados do jogo incompletos!" };
    }
    if (jogo.quantidade < 0) {
        throw { id: 400, msg: "Quantidade menor que zero!" };
    }
    if (jogo.preco < 0) {
        throw { id: 400, msg: "Valor menor que zero!" };
    }
    if (ValidaNome(jogo.nome) == true) {
        throw { id: 404, msg: "Jogo já cadastrado!" };
    }
    jogo.id = idGerador++;
    listaJogos.push(jogo);
    return jogo;
}

function BuscarPorId(id) {
    return (listaJogos.find(
        function (jogo) {
            return (jogo.id == id);
        }
    ));
}

function Atualizar(id, jogo) {
    if (!jogo || !jogo.nome || !jogo.categoria || !jogo.preco || !jogo.quantidade) {
        return;
    }
    let IndiceJogo = listaJogos.findIndex(function(jogo) {
        return (jogo.id == id);
    });

    if (IndiceJogo == -1) {
        throw new Error("Jogo não encontrado!"); // Lançando um erro padrão
    }

    jogo.id = id; // Associar o ID ao jogo atualizado
    listaJogos[IndiceJogo] = jogo;
    return jogo;
}

function Deletar(id) {
    let IndiceJogo = listaJogos.findIndex(function (jogo) {
        return (jogo.id == id);
    })
    if (IndiceJogo == -1) return;
    return (listaJogos.splice(IndiceJogo, 1))[0];
}

function PesquisarPorCategoria(categoria) {
    return listaJogos.filter((jogo) => jogo.categoria == categoria)
}


//  VALIDAÇÕES
function ValidaNome(nome) {
    const resultado = listaJogos.find((jogo) => jogo.nome == nome)
    if (resultado) { return true }
    else { return false }
}




module.exports = {
    Listar,
    Inserir,
    Atualizar,
    BuscarPorId,
    Atualizar,
    Deletar,
    PesquisarPorCategoria,
    resetState

}