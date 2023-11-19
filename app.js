const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

// importando as bibliotecas de sessão e cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// API
const apiKey = 'aa42c1f1a42141e4b290ae340ac265f2';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

// CSS
app.use(express.static(path.join(__dirname, './public')));

// configuração do ejs para carregar as views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configurar o body-parser para processar os dados do form
app.use(bodyParser.urlencoded({ extended: true }));

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

// firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCebiwmgVov-Z5G4hZbhEL4IV4zwYoT9W8",
    authDomain: "autenticacao-87c74.firebaseapp.com",
    projectId: "autenticacao-87c74",
    storageBucket: "autenticacao-87c74.appspot.com",
    messagingSenderId: "778355577088",
    appId: "1:778355577088:web:92a57ccaf3a27eb522a3e5",
    measurementId: "G-ZXKEF3F3MR"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

const posts = [
    {
        id: 1,
        title: 'Red Dead Redemption 2',
        content: 'Muito Foda'
    },
    {
        id: 2,
        title: 'Spider-Man 2',
        content: 'Assegurado como um dos candidatos ao Game of The Year de 2023, bla bla bla'
    }
];

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
function auth2(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true;
        next();
    } else {
        res.status(403).send('Sem autorização');
    }
}

// middeware de horário de acesso de página
app.use(logger, (req, res, next) => {
    const currentDate = new Date();
    console.log(`Solicitação recebida em: ${currentDate}\n-----------\n`);
    next();
});

//página inicial
app.get('/', (req, res) => {
    res.send(`
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">

    </head>

        <header class="header">
            <a href="/home?admin=true">Nando Company</a>

            <nav>
                <a href="/listaJogos">Jogos</a>
                <a href="/sobre">Sobre</a>
                <a href="/contato">Contato</a>
                <a href="/login">Login</a>
            </nav>
        </header>

        <div class="background_home">
            <div class="texto_home">
                <h2>Seja Bem-Vindo(a)</h2>
                <p>Encontre seus jogos favoritos entre uma vasta biblioteca de
                500.000+ jogos e demos para adquirir, jogar e avaliar!</p>
                <p>Se junte a Nando Company e obtenha ofertas exclusivas para assinantes e colaboradores,
                 conecte-se e se junte a maior rede de entreterimento do mundo!</p>
                <a href="/login">Login</a>
            </div>
        </div>
    `)
})

// Página Sobre
app.get('/Sobre', (req, res) => {
    res.send(`
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

        <header class="header">
            <a href="/">Nando Company</a>

            <nav>
                <a href="/listaJogos">Jogos</a>
                <a href="/sobre">Sobre</a>
                <a href="/contato">Contato</a>
                <a href="/login">Login</a>
            </nav>
        </header>

        <div class="caixa_sobre">
            <h2>Sobre a Nando Company</h2>
            <p>A Nando Company Entertainment surgiu a partir da ideia de reunir diversos
            recursos de entreterinemto em um mesmo lugar, seja filmes, jogos, séries, etc. </p>
        </div>

        <div class="caixa_sobre">
            <p>O Website foi lançado em 2023, reunindo primeiramente uma coletânea de jogos para
            usuários avaliar suas experiências durante a jogatina.</p>
        </div>
    `)
})

// Página da API
app.get('/listaJogos', (req, res) => {
    axios.get(apiUrl)
        .then(response => {
            const games = response.data.results;

            if (games.length > 0) {
                const gameListHTML = games.map(game => `
            <div class="api">
              <h2>${game.name}</h2>
              <img src="${game.background_image}" alt="${game.name}" style="max-width: 300px;">
              <p>Data de Lançamento: ${game.released}</p>
              <p>Desenvolvedora: ${game.developers && game.developers.length > 0 ? game.developers[0].name : 'Não disponível'}</p>
              <p>Classificação: ${game.rating || 'Não disponível'}</p>
              <p>Descrição: ${game.description || 'Não disponível'}</p>
            </div>
          `).join('');

                res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <link rel="stylesheet" type="text/css" href="/style.css">
                <title>Lista de Jogos</title>
              </head>
              <body>

                <header class="header">
                    <a href="/">Nando Company</a>
        
                    <nav>
                        <a href="/listaJogos">Jogos</a>
                        <a href="/sobre">Sobre</a>
                        <a href="/contato">Contato</a>
                        <a href="/login">Login</a>
                    </nav>
                </header>

                <div class="container_jogos">
                    ${gameListHTML}
                </div>
              </body>
            </html>
          `);
            } else {
                res.send(`<p>Nenhum jogo encontrado com o título "${gameTitle}".</p>`);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar informações do jogo:', error.message);
            res.status(500).send('Erro ao buscar informações do jogo.');
        });
});

// login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential);
        res.redirect('/home?admin=true');
    } catch (error) {
        res.send(error.message);
    }
});

// Home com o usuário logado
app.get('/home', auth2, (req, res) => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
        console.log(`Usuário admin = ${req.admin}`)
        console.log('Página do Usuário acessada')
        res.render('home', { user: user });
    } else {
        res.redirect('/login');
        console.log('Sem autorização')
    }
});

// Posts
app.get('/post_usuario', (req, res) => {
    res.render('index', { posts });
});

//Rota para exibir uma postagem individual
app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(post => post.id === parseInt(id));
    res.render('post', { post });
});

//Rota para exibir o formulário de adição de post
app.get('/add', (req, res) => {
    res.render('add');
});

//Rota para processar a adição da postagem
app.post('/add', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect('/post_usuario');
});

// Rota inicial para exibir produtos
app.get('/avaliar', (req, res) => {
    res.send(`
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css">
        </head>

        <div class="container_avaliar">
            <a href="/post_usuario" class="botao_volta">Voltar</a>
            
            <h1>Notas do Pampa's Awards</h1>

            <div class="avaliar_caixa">
                <h2>Arte</h2>
                <ul>
                    ${produtos.map(
        (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button></button></a></li>`
    ).join("")}    
                </ul>
            </div>

            <div class="avaliar_caixa">
                <h2>Música</h2>
                <ul>
                    ${produtos.map(
        (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button></button></a></li>`
    ).join("")}    
                </ul>
            </div>

            <div class="avaliar_caixa">
                <h2>História</h2>
                <ul>
                    ${produtos.map(
        (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button></button></a></li>`
    ).join("")}    
                </ul>
            </div>

            <div class="avaliar_caixa">
                <h2>Personagens</h2>
                <ul>
                    ${produtos.map(
        (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button></button></a></li>`
    ).join("")}    
                </ul>
            </div>

            <div class="avaliar_caixa">
                <h2>Dificuldade</h2>
                <ul>
                    ${produtos.map(
        (produto_controle) => `<li>${produto_controle.nome} ${produto_controle.preco} <a href="/adicionar/${produto_controle.id}"><button></button></a></li>`
    ).join("")}    
                </ul>
            </div>

            <a class="nota" href="/carrinho">Ver nota final</a>
        </div>
    `);
});

// Rota de adicionar
app.get('/adicionar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto_controle = produtos.find((p) => p.id === id);

    if (produto_controle) {
        if (!req.session.carrinho) {
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

app.get('/nota_post', (req, res) => {
    const carrinho = req.session.carrinho || [];
    const total = carrinho.reduce((acc, produto_controle) => acc + produto_controle.preco, 0);
    res.cookie(`exemploCookie', ${total}, { maxAge: 900000, httpOnly: true }`);
    res.send(`    
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

    <div class="nota_post_container">

        <div class="caixa_nota_post">
            <p>${total}</p>
        </div>

        <div class="nota_post_voltar">
            <a href="/post_usuario">Voltar</a>
        </div>
    </div>
    `);
});

app.listen(port, () => {
    console.log(`Console iniciado na porta http://localhost:${port}`)
});

module.exports = app;