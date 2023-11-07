const express = require('express');
const app = express();
const port = 3333;

// middleware global (para todas as páginas) (troca de página e horário)
app.use(logger, (req, res, next) => {
    const currentDate = new Date();
    console.log(`Solicitação recebida em: ${currentDate}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/users', auth, (req, res) => {
    console.log(`Usuário admin = ${req.admin}`)
    console.log('Página do Usuário acessada')
    res.send('Página do Usuário autorizada')
})

// função global para disparar mensagem
function logger(req, res, next) {
    console.log('Usuário trocou de página')
    next()
}

//função principal de autenticação
function auth(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true
        next()
    } else {
        res.send('Sem Autenticação')
    }
}

app.listen(3333, () => {
    console.log(`Console iniciado na porta http://localhost:${port}`)
});