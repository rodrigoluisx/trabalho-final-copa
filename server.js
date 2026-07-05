const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const PORTA = 5500;

const db = new DatabaseSync(path.join(__dirname, "meubanco.db"));

db.exec(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT,
    jogador_favorito TEXT,
    data_nascimento TEXT,
    cidade TEXT
);
`);

const servidor = http.createServer(async (req, res) => {

    // GET - Listar usuários
    if (req.url === "/api/usuarios" && req.method === "GET") {
        const usuarios = db
            .prepare("SELECT * FROM usuarios ORDER BY id DESC")
            .all();

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(usuarios));
        return;
    }

    // POST - Cadastrar usuário
    if (req.url === "/api/usuarios" && req.method === "POST") {
        let corpo = "";

        for await (const pedaco of req) {
            corpo += pedaco;
        }

        const dados = JSON.parse(corpo);

        db.prepare(`
            INSERT INTO usuarios
            (nome, email, senha, jogador_favorito, data_nascimento, cidade)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            dados.nome,
            dados.email,
            dados.senha,
            dados.jogador_favorito,
            dados.data_nascimento,
            dados.cidade
        );

        res.end("ok");
        return;
    }

    // Arquivos estáticos
    const nomeArquivo = req.url === "/" ? "index.html" : req.url;

    if (nomeArquivo.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
    }

    fs.readFile(path.join(__dirname, nomeArquivo), (erro, conteudo) => {
        if (erro) {
            res.statusCode = 404;
            res.end("Arquivo não encontrado");
            return;
        }

        res.end(conteudo);
    });
});

console.log("Cheguei no final do arquivo");

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});