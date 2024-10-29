const JogoService = require("../Service/JogoService")

function listar(req, res){
    res.json(JogoService.Listar());
}

function buscarPorId(req, res){
    const id = req.params.id;
    try{
        res.json(JogoService.BuscarPorId(id));
    }catch(err){
        res.status(err.id).json(err);
    }
}

function inserir(req, res){
    const jogo = req.body;
    try{
        const jogoInserido = JogoService.Inserir(jogo);
        res.status(201).json(jogoInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
}

function atualizar(req, res){
    const id = req.params.id;
    const jogo = req.body;
    try{
      const jogoAtualizado = JogoService.Atualizar(id, jogo)
      res.status(201).json(jogoAtualizado)
    }catch(err){
      res.status(err.id).json(err)
    }
}

function deletar(req, res){
    const id = req.params.id;
    try{
      const jogoExcluido = JogoService.Deletar(id)
      res.status(200).json(jogoExcluido)
    }catch(err){
      res.status(err).json(err)
    }
}

function buscarPorCategoria(req, res){
    const categoria = req.params.categoria;
    try{
        res.json(JogoService.BuscarPorCategoria(categoria));
    }catch(err){
        res.status(err.id).json(err);
    }
}




module.exports = {
    listar,
    inserir,
    atualizar,
    deletar,
    buscarPorCategoria,
    buscarPorId
}