const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = 'aa42c1f1a42141e4b290ae340ac265f2';
const gameTitle = 'The Witcher 3';

const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameTitle}`;

app.get('/', (req, res) => {
  axios.get(apiUrl)
    .then(response => {
      const games = response.data.results;

      if (games.length > 0) {
        const gameListHTML = games.map(game => `
          <div>
            <h2>${game.name}</h2>
            <img src="${game.background_image}" alt="${game.name}" style="max-width: 300px;">
            <p>Data de Lançamento: ${game.released}</p>
            <p>Desenvolvedora: ${game.developers && game.developers.length > 0 ? game.developers[0].name : 'Não disponível'}</p>
            <p>Classificação: ${game.rating || 'Não disponível'}</p>
            <p>Descrição: ${game.description || 'Não disponível'}</p>
            <hr>
          </div>
        `).join('');

        res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Lista de Jogos</title>
            </head>
            <body>
              <h1>Lista de Jogos</h1>
              ${gameListHTML}
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
