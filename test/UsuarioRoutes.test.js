const request = require('supertest');
const app = require('../app')

describe('Testes das rotas de Usuários', () => {
    let idUsuarioCriado;
    const usuarioTeste = { nome: "Teste User", cpf: "12345678901" };
    
    // Teste da rota POST - Inserir
    it('POST /usuarios - deve criar um novo usuário', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send(usuarioTeste);

        expect(res.statusCode).toBe(201); // Supondo que retorna 201 ao criar
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe(usuarioTeste.nome);
        expect(res.body.cpf).toBe(usuarioTeste.cpf);
        idUsuarioCriado = res.body.id; // Guardar o ID para testes posteriores
    });

    // Teste da rota GET - Listar todos os usuários
    it('GET /usuarios - deve listar todos os usuários', async () => {
        const res = await request(app).get('/usuarios');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste da rota GET - Buscar por ID
    it('GET /usuarios/:id - deve buscar um usuário pelo ID', async () => {
        const res = await request(app).get(`/usuarios/${idUsuarioCriado}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', idUsuarioCriado);
    });

    // Teste da rota GET - Buscar por CPF
    it('GET /usuarios/cpf/:cpf - deve buscar um usuário pelo CPF', async () => {
        const res = await request(app).get(`/usuarios/cpf/${usuarioTeste.cpf}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('cpf', usuarioTeste.cpf);
    });

    // Teste da rota PUT - Atualizar
    it('PUT /usuarios/:id - deve atualizar um usuário existente', async () => {
        const res = await request(app)
            .put(`/usuarios/${idUsuarioCriado}`)
            .send({ nome: "Teste User Atualizado", cpf: usuarioTeste.cpf });

        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe("Teste User Atualizado");
    });

    // Teste da rota DELETE - Deletar
    it('DELETE /usuarios/:id - deve deletar um usuário pelo ID', async () => {
        const res = await request(app).delete(`/usuarios/${idUsuarioCriado}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', idUsuarioCriado);
    });

    // Teste para tentar buscar um usuário deletado
    it('GET /usuarios/:id - deve retornar 404 ao buscar um usuário deletado', async () => {
        const res = await request(app).get(`/usuarios/${idUsuarioCriado}`);
        
        expect(res.statusCode).toBe(404); // Verifica que o usuário foi realmente deletado
    });
});