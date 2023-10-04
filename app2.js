const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// configuração do ejs para carregar as views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// configurar o body-parser para processar os dados do form
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));

//blog
const posts = [
    {
        id: 1,
        title: 'Primeira Postagem',
        content: 'Este é o conteúdo da primeira postagem'
    },
    {
        id: 2,
        title: 'Segunda Postagem',
        content: 'Este é o conteúdo da segunda postagem'
    }
];

//Rota principal
app.get('/', (req, res) => {
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
    posts.push({id, title, content});
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});