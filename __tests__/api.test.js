const request = require('supertest');
const app = require('../app');

// teste unitário para retorno de HTML das páginas
describe('GET /', () => {
  test('Deve retornar o HTML da página Home', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain(`<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>

        <header class="header">
            <h1>Nando Company</h1>

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