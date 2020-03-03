// importando o modulo de roteamento do express
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// ROTAS

// Para listagem
routes.get('/devs', DevController.index);

// Para cadastro
routes.post('/devs', DevController.store);

// Para busca
routes.get('/search', SearchController.index);

module.exports = routes;
