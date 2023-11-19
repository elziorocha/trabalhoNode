const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Console iniciado na porta http://localhost:${port}`)
});

module.exports = app;