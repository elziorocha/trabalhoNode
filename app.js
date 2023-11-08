// importando o framework express
const express = require('express');

// importando as bibliotecas de sessão e cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');

// inicializar o express
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, './public')));

// configurando os cookies
app.use(cookieParser());

// configurando as sessões
app.use(
    session({
        secret: 'minha-chave', // chave secreta para assinar os cookies das sessões
        resave: false, // evita regravar sessões sem alterações
        saveUninitialized: true, // salva sessões não inicializadas
    })
);

const produtos = [
    {
        id: 1,
        nome: 'Nota:',
        preco: 1
    },
    {
        id: 2,
        nome: 'Nota:',
        preco: 2
    },
    {
        id: 3,
        nome: 'Nota:',
        preco: 3
    },
    {
        id: 4,
        nome: 'Nota:',
        preco: 4
    },
    {
        id: 5,
        nome: 'Nota:',
        preco: 5
    },
];

// função global para disparar mensagem
function logger(req, res, next) {
    console.log('-----------\nUsuário trocou de página')
    next()
}

// função para autenticação
function auth(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true
        next()
    } else {
        res.send('Sem Autenticação')
    }
}

// middeware de horário de acesso de página
app.use(logger, (req, res, next) => {
    const currentDate = new Date();
    console.log(`Solicitação recebida em: ${currentDate}\n-----------\n`);
    next();
});

// middleware de autenticação na página de usuário
function auth(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true
        next()
    } else {
        res.send('Sem Autenticação')
    }
}

//página inicial
app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/usuarios', auth, (req, res) => {
    console.log(`Usuário admin = ${req.admin}`)
    console.log('Página do Usuário acessada')
    res.send('Página do Usuário autorizada')
})

// Rota inicial para exibir produtos
app.get('/avaliar', (req, res) => {
    res.send(`
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css">
        </head>

        <div class="container_avaliar">
            <h1>Notas do Pampa's Awards</h1>
            <h2>Arte</h2>
            <ul>
                ${produtos.map(
                    (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button>.</button></a></li>`
                ).join("")}    
            </ul>

            <h2>Música</h2>
            <ul>
                ${produtos.map(
                    (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button>.</button></a></li>`
                ).join("")}    
            </ul>

            <h2>História</h2>
            <ul>
                ${produtos.map(
                    (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button>.</button></a></li>`
                ).join("")}    
            </ul>

            <h2>Personagens</h2>
            <ul>
                ${produtos.map(
                    (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button>.</button></a></li>`
                ).join("")}    
            </ul>

            <h2>Dificuldade</h2>
            <ul>
                ${produtos.map(
                    (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button>.</button></a></li>`
                ).join("")}    
            </ul>

            <a class="nota" href="/carrinho">Ver nota final</a>
        </div>
    `);
});

// Rota de adicionar
app.get('/adicionar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto_controle = produtos.find((p) => p.id === id);

    if(produto_controle){
        if(!req.session.carrinho){
            req.session.carrinho = [];
        }
        req.session.carrinho.push(produto_controle);
    }
    res.redirect('/avaliar');
});

// Rota do carrinho
app.get('/carrinho', (req, res) => {
    const carrinho = req.session.carrinho || [];
    const total = carrinho.reduce((acc, produto_controle) => acc + produto_controle.preco, 0);

    res.send(`
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

        <div class="nota_final">
            <h1>Nota Final</h1>
    
            <div class="caixa_nota">
                <p>${total / 5}</p>
            </div>

            <div class="voltar">
                <a href="/avaliar">Voltar</a>
            </div>
        </div>

    `);
});

app.listen(port, () => {
    console.log(`Console iniciado na porta http://localhost:${port}`)
});

//fazer a média do total