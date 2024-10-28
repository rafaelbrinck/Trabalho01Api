const express = require('express');
const app = express();
const PORT = 3000;

const JogoService = require('./Service/JogoService')
const UserService = require('./Service/UsuarioService')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send("Página Inicial");
})

//  ------------------ ROTAS DOS JOGOS ------------------------

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

// BUSCAR POR CATEGORIA
app.get('/jogos/categoria/:categoria', (req, res) =>{
    const categoria = req.params.categoria;
    try{
        res.json(JogoService.BuscarPorCategoria(categoria));
    }catch(err){
        res.status(err.id).json(err);
    }
})



//  ------------------ ROTAS DOS USUARIOS ------------------------

//  LISTAR
app.get('/usuarios', (req, res) =>{
    res.json(UserService.Listar());
})

//  BUSCAR POR Id
app.get('/usuarios/:id', (req, res) =>{
    const id = req.params.id;
    try{
        res.json(UserService.BuscarPorId(id));
    }catch(err){
        res.status(err.id).json(err);
    }
})

//  INSERIR
app.post('/usuarios', (req,res) => {
    const user = req.body;
    try{
        const userInserido = UserService.Inserir(user);
        res.status(201).json(userInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
})


//  ATUALIZAR
app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    try{
      const userAtualizado = UserService.Atualizar(id, user)
      res.status(201).json(userAtualizado)
    }catch(err){
      res.status(err.id).json(err)
    }
})

//  DELETAR
app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    try{
      const userExcluido = UserService.Deletar(id)
      res.status(200).json(userExcluido)
    }catch(err){
      res.status(err).json(err)
    }
})

// BUSCAR POR CPF
app.get('/usuarios/:cpf', (req, res) =>{
    const cpf = req.params.cpf;
    try{
        res.json(UserService.BuscarPorCPF(cpf));
    }catch(err){
        res.status(err.id).json(err);
    }
})






//  ------------------ ROTAS DOS FAVORITOS ------------------------


app.get('/usuarios/favoritos', (req, res) =>{
    res.json(UserService.ListarFavoritos());
})

app.post('/usuarios/favoritos', (req, res) =>{
    const favorito = req.body;
    try{
        const favoritoInserido = UserService.InserirFavoritos(favorito);
        res.status(201).json(favoritoInserido)
    }catch(err){
      res.status(err.id).json(err)
    }
})
app.get('/usuarios/favoritos/:id', (req, res) =>{
    const id = req.params.id;
    try{
        res.json(UserService.ListarFavoritosDeID(id));
    }catch(err){
        res.status(err.id).json(err);
    }
})






app.listen(PORT, () => {
    console.log(`Servidor executando na porta http://localhost:${PORT}`)
})
  



