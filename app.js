const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

// importando as bibliotecas de sessão e cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// CSS
app.use(express.static(path.join(__dirname, './public')));

// configuração do ejs para carregar as views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configurar o body-parser para processar os dados do form
app.use(bodyParser.urlencoded({extended : true}));

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
            <a href="/"><h1>Nando Company</h1></a>

            <nav>
                <a href="/sobre">Sobre</a>
                <a href="/contato">Contato</a>
                <a href="/login">Login</a>
            </nav>
        </header>

        <div class="background_home">
            <div class="home">
                <div>
                    <h1>Nando Games</h1>
                </div>

                <nav>
                    <a href="/post_usuario">Suas Postagens</a>
                </nav>
            </div>
        </div>
    `)
})

app.get('/Sobre', (req, res) => {
    res.send(`
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

        <header class="header">
            <a href="/"><h1>Nando Company</h1></a>

            <nav>
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

// login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.get('/home', (req, res) => {
    const user = auth.currentUser;
    console.log(user); // Adicione esta linha
    if (user) {
        res.render('home', { user: user });
    } else {
        res.redirect('/login');
    }
});

// posts
app.get('/post_usuario', (req, res) => {
    res.render('index', { posts });
});

app.get('/usuarios', auth2, (req, res) => {
    console.log(`Usuário admin = ${req.admin}`)
    console.log('Página do Usuário acessada')
    res.send('Página do Usuário autorizada')
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
    posts.push({id, title, content});
    res.redirect('/');
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

module.exports = app;