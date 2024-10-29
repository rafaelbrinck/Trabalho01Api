const JogoService = require('../Service/JogoService');
const JogoRepository = require('./JogoRepository')
let listaUsuarios = [];
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


module.exports = {
    Listar,
    Inserir,
    Atualizar,
    BuscarPorId, 
    Atualizar,
    Deletar,
    PesquisarPorCpf
}