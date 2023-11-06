const express = require('express');
const app = express();

app.use(logger);

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/users', auth, (req, res) => {
    res.send('Users Page')
})

function logger(req, res, next) {
    console.log('Log')
    next()
}

function auth(req, res, next) {
    console.log('Auth')
    next()
}

app.listen(3333, () => {
    console.log('Console iniciado')
});