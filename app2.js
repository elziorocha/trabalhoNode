const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// configuração do ejs para carregar as views
app.set('view engine', 'ejs')