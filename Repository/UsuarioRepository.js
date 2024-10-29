const JogoService = require('../Service/JogoService');
const JogoRepository = require('./JogoRepository')
let listaUsuarios = [];
let listaFavoritos = [];
let idGerador = 1;



function Listar(){
    return listaUsuarios;
}

function Inserir(user){
    if(!user || !user.nome || !user.cpf){
        return;
    }
    if(ValidaNome(user.nome) == true){
        throw { id: 404, msg: "Nome já cadastrado!" };
    }
    if(ValidaCPF(user.cpf) == true){
        throw { id: 404, msg: "CPF já cadastrado!" };
    }
    user.id = idGerador++;
    user.valor = 0;
    listaUsuarios.push(user);
    return user;
}

function BuscarPorId(id){
    return (listaUsuarios.find( 
        function(user){
            return (user.id == id);
        }
    ));
}

function Atualizar(id, user){
    if(!user || !user.nome || !user.cpf){
        return;
    }
    let IndiceUser = listaUsuarios.findIndex(
        function(user){
            return (user.id == id);
        }
    )

    if(IndiceUser == -1) return;
    user.id = id;
    listaUsuarios[IndiceUser] = user;
    return user;
}

function Deletar(id){
    let IndiceUser = listaUsuarios.findIndex(function(user) {
        return (user.id == id);
    })
    if(IndiceUser == -1) return;
    return (listaUsuarios.splice(IndiceUser, 1))[0];
}

function PesquisarPorCpf(cpf) {
    return listaUsuarios.filter( (user) => user.cpf == cpf )
}

//  VALIDAÇÕES
function ValidaCPF(cpf){
    const resultado = listaUsuarios.find( (user) => user.cpf == cpf)
    if(resultado){return true}
    else{return false}
}
function ValidaNome(nome){
    const resultado = listaUsuarios.find( (user) => user.nome == nome)
    if(resultado){return true}
    else{return false}
}



// FAVORITOS
function ListarFavoritos(){
    return listaFavoritos;
}

function InserirFavoritos(favorito){
    if(!favorito || !favorito.jogoID || !favorito.userID){
        return;
    }
    const jogoFavorito = JogoService.BuscarPorId(favorito.jogoID);
    if(!jogoFavorito){
        throw { id: 404, msg: "Jogo não cadastrado" };
    }
    if(!BuscarPorId(favorito.userID)){
        throw { id: 404, msg: "Usuario não cadastrado" };
    }
    favorito.id = idGerador++;
    listaFavoritos.push(favorito);
    return favorito;
}

function ListarFavoritosDeID(id){
    if(!id){
        return;
    }
    const jogosFavs = []
    const favList = listaFavoritos.filter((favorito) => favorito.userID == id)
    favList.forEach((fav) =>{
        const jogo = JogoRepository.BuscarPorId(fav.jogoID);
        jogosFavs.push(jogo)

    })
    return jogosFavs;
}



module.exports = {
    Listar,
    Inserir,
    Atualizar,
    BuscarPorId, 
    Atualizar,
    Deletar,
    PesquisarPorCpf
}