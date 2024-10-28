const UserRepository = require('../Repository/UsuarioRepository')


function Listar(){
    return UserRepository.Listar();
}

function Inserir(user){
    if(user && user.nome && user.cpf){
        return UserRepository.Inserir(user);
    }else{
        throw { id: 400, msg: "Usuário sem dados corretos"}
    }
}

function BuscarPorId(id) {
    let user = UserRepository.BuscarPorId(id);
    if(user) {
        return user;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

function Atualizar(id, user) {
    if(user && user.nome && user.cpf) {
        const UsuarioAtualizado = UserRepository.Atualizar(id, user);
        if(UsuarioAtualizado) {
            return UsuarioAtualizado;
        }        
        else {
            throw {id:404, msg: "Usuário não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Usuário sem dados corretos"};
    }
}


function Deletar(id) {
    let user = UserRepository.Deletar(id);
    if(user) {
        return user;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}


function BuscarPorCPF(cpf){
    const usuario = UserRepository.BuscarPorCPF(cpf);
    if(usuario){
        return usuario;
    }else {
        throw { id: 404, msg: "Usuario não encontrado!" }
    }
}


function ListarFavoritos(){
    return UserRepository.ListarFavoritos();
}

function InserirFavoritos(favorito){
    if(favorito && favorito.userID && favorito.jogoID){
        return UserRepository.InserirFavoritos(favorito);
    }else{
        throw { id: 400, msg: "Favoritos sem dados corretos"}
    }
}
function ListarFavoritosDeID(id) {
    let jogosFavoritos = UserRepository.ListarFavoritosDeID(id);
    if(jogosFavoritos) {
        return jogosFavoritos;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}



module.exports = {
    Listar,
    Inserir,
    BuscarPorId,
    Atualizar,
    Deletar,
    BuscarPorCPF,
    InserirFavoritos,
    ListarFavoritos,
    ListarFavoritosDeID
}