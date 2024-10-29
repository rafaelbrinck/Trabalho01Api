const UserService = require("../Service/UsuarioService")

function listar(req, res){
    res.json(UserService.Listar());
}

function buscarPorId(req, res){
    const id = req.params.id;
    try{
        res.json(UserService.BuscarPorId(id));
    }catch(err){
        res.status(err.id).json(err);
    }
}

function inserir(req, res){
    const user = req.body;
    try{
        const userInserido = UserService.Inserir(user);
        res.status(201).json(userInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
}

function atualizar(req, res){
    const id = req.params.id;
    const user = req.body;
    try{
      const userAtualizado = UserService.Atualizar(id, user)
      res.status(201).json(userAtualizado)
    }catch(err){
      res.status(err.id).json(err)
    }
}

function deletar(req, res){
    const id = req.params.id;
    try{
      const userExcluido = UserService.Deletar(id)
      res.status(200).json(userExcluido)
    }catch(err){
      res.status(err).json(err)
    }
}

function buscarPorCpf(req, res){
    const cpf = req.params.cpf;
    try{
        res.json(UserService.BuscarPorCPF(cpf));
    }catch(err){
        res.status(err.id).json(err);
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorCpf,
    buscarPorId,
    atualizar,
    deletar
}