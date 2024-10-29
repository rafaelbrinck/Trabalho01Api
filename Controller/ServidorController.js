const ServidorService = require("../Service/ServidorService")

function listar(req, res){
    res.json(ServidorService.listar());
}

function listarDescricoes(req, res){
    const id = req.params.id;
    try{
        res.json(ServidorService.listarDescricoes(id));
    }catch(err){
        res.status(err.id).json(err);
    }
}

function inserir(req, res){
    const locacao = req.body;
    try{
        const locacaoInserido = ServidorService.inserir(locacao);
        res.status(201).json(locacaoInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
}

function deletar(req, res){
    const id = req.params.id;
    try{
      const Valor = ServidorService.deletar(id)
      res.status(200).json(Valor)
    }catch(err){
      res.status(err).json(err)
    }
}

module.exports = {
    listar,
    listarDescricoes,
    inserir,
    deletar
}