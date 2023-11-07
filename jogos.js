//teste API
const express = require('express');
const server = express();
const port = 3333;
const jogos = require('./src/data/jogos.json');

server.get('/jogos', (req, res) => {
    return res.json(jogos)
});

server.listen(3333, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});