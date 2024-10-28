let listaUsuarios = [];
let idGerador = 1;

function Listar(){
    return listaUsuarios;
}

function Inserir(user){
    if(!user || !user.nome || !user.cpf){
        return;
    }
    user.id = idGerador++;
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

function Atualizar(id, jogo){
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

module.exports = {
    Listar,
    Inserir,
    Atualizar,
    BuscarPorId, 
    Atualizar,
    Deletar,
    PesquisarPorCpf
}