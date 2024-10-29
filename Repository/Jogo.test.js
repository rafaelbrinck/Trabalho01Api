const { inserir, listar } = require('../Controller/JogoController');
const { Listar, Inserir, BuscarPorId, Atualizar, Deletar, PesquisarPorCategoria } = require('./JogoRepository')

// Reinicia o estado da lista antes de cada teste 
beforeEach(() => {
    listaJogos = [];
    idGerador = 1;
});

describe("CRUD jogos", () => {

    // Teste para Listar 
    test("Listar - sucesso", () => {
        expect(Listar()).toEqual([]);
        Inserir({ nome: "Call Of Duty", categoria: "FPS", preco: 150, quantidade: 10 })
        expect(Listar().length.toBe(1));
    });

    // Test para Inserir 
    test("Inserir - sucesso", () => {
        const jogo = { nome: "Call Of Duty", categoria: "FPS", preco: 150, quantidade: 10 };
        const result = Inserir(jogo);
        expect(result).toHaveProperty("id", 1);
        expect(result.nome).toBe("Call Of Duty");
    });

    test("Inserir - Exceção para quantidade negativa", () => {
        const jogo = { nome: "New World", categoria: "MMORPG", preco: 240, quantidade: -5 };
        expect(() => Inserir(jogo)).toThrow({ id: 400, msg: "Quantidade menor que zero!" })
    });

    test("Inserir - Exceção para preço negativo", () => {
        const jogo = { nome: "New World", categoria: "MMORPG", preco: -240, quantidade: 5 };
        expect(() => Inserir(jogo)).toThrow({ id: 400, msg: "Preço menor que zero!" });
    });

    test("Inserir - Exceção para nome duplicado", () => {
        const jogo1 = { nome: "New World", categoria: "MMORPG", preco: 240, quantidade: 5 };
        const jogo2 = { nome: "New World", categoria: "MMORPG", preco: 240, quantidade: 5 };
        Inserir(jogo1);
        expect(() => Inserir(jogo2)).toThrow({ id: 404, msg: "jogo já cadastrado!" });

    });

    // Teste para BuscarPorId
    test("BuscarPorId - sucesso", () => {
        const jogo = Inserir({ nome: "New World", categoria: "MMORPG", preco: 240, quantidade: 5 });
        const result = BuscarPorId(999).toBeUndefined();
    });

    test("BuscarPorId - exceção para ID inexistente", () => {
        expect(BuscarPorId(999)).toBeUndefined();
    });

    // Teste para Atualizar 
    test("Atualizar - sucesso", () => {
        const jogo = Inserir({ nome: "New World - Beta", categoria: "MMORPG", preco: 0, quantidade: 5 });
        const atualizado = Inserir({ nome: "New World - Versão Final", categoria: "MMORPG", preco: 240, quantidade: 5 });
        const result = Atualizar(jogo.id, atualizado);
        expect(result.nome).toBe("New World - Versão Final");
    });

    test("Atualizar - exceção para ID inexistente", () => {
        const atualizado = { nome: "New World - Versão Final", categoria: "MMORPG", preco: 240, quantidade: 5 };
        expect(Atualizar(999, atualizado)).toBeUndefined();
    });

    // Testes para Deletar
    test("Deletar - Suceso", () => {
        const jogo = Inserir({ nome: "New World - Versão Final", categoria: "MMORPG", preco: 240, quantidade: 5 });
        const result = Deletar(jogo.id);
        expect(result).toBe(jogo);
        expect(Listar().length).toBe(0);
    });

    test("Deletar - exceção para ID inexistente", () => {
        expect(Deletar(999)).toBeUndefined();
    });

    // Teste para PesquisarPorCategoria
    test("PesquisarPorCategoria - sucesso", () => {
        Inserir({ nome: "New World - Versão Final", categoria: "MMORPG", preco: 240, quantidade: 5 });
        Inserir({ nome: "Word Of Warcraft", categoria: "MMORPG", preco: 30, quantidade: 5 });
        const result = PesquisarPorCategoria("MMORPG")
        expect(result.length).toBe(2);
    });

    test("PesquisarPorCategoria - exceção para categoria inexistente", () => {
        expect(PesquisarPorCategoria("Inexistente")).toEqual([]);
    });
});
