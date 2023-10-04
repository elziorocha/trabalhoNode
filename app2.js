const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// configuração do ejs para carregar as views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// configurar o body-parser para processar os dados do form
app.use(bodyParser.urlencoded({extended : true}));

//blog
const post = [
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