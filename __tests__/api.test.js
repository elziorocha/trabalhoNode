const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  test('Deve retornar o HTML da página Home', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot(`<html>
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
        </div>`);
  });
});

describe('GET /sobre', () => {
  test('Deve retornar o HTML da página Sobre', async () => {
    const response = await request(app).get('/sobre');
    expect(response.status).toBe(200);
    expect(response.text).toMatchSnapshot(`<html>
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
        </div>`);
  });
});
