const express = require('express');
const app = express();
const PORT = 3000;

const JogoService = require('./Service/JogoService')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send("Página Inicial");
})

//  LISTAR
app.get('/jogos', (req, res) =>{
    res.json(JogoService.Listar());
})

//  BUSCAR POR ID
app.get('/jogos/:id', (req, res) =>{
    const id = req.params.id;
    try{
        res.json(JogoService.BuscarPorId(id));
    }catch(err){
        res.status(err.id).json(err);
    }
})

//  INSERIR
app.post('/jogos', (req,res) => {
    const jogo = req.body;
    try{
        const jogoInserido = JogoService.Inserir(jogo);
        res.status(201).json(jogoInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
})


//  ATUALIZAR
app.put('/jogos/:id', (req, res) => {
    const id = req.params.id;
    const jogo = req.body;
    try{
      const jogoAtualizado = JogoService.Atualizar(id, jogo)
      res.status(201).json(jogoAtualizado)
    }catch(err){
      res.status(err.id).json(err)
    }
})

//  DELETAR
app.delete('/jogos/:id', (req, res) => {
    const id = req.params.id;
    try{
      const jogoExcluido = JogoService.Deletar(id)
      res.status(200).json(jogoExcluido)
    }catch(err){
      res.status(err).json(err)
    }
})


app.listen(PORT, () => {
    console.log(`Servidor executando na porta http://localhost:${PORT}`)
})
  



