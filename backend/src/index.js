const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// Importando as rotas do arquivo
const routes = require('./routes');
// importanto o websocket
const { setupWebsocket } = require('./websocket');

const app = express();

// utilizando protocolo http fora do express
const server = http.Server(app);

// instanciando o websocket enviando o servidor
setupWebsocket(server);

// Conectando banco de dados não-relacional, o MongoDB, através do mongodb.com.
// Instalar mongosse
// Substituir o <password> pela senha da conta
mongoose.connect(
	'mongodb+srv://saullobueno:q1w2e3r4@cluster0-cc8ik.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

// Habilitar acesso ao backend para outras endereços. Deixando vazio habilita para todos, ou especifique conforme abaixo.
app.use(cors(/* { origin: 'http://localhost:3000' } */));

// Falando para o express entender JSON em toda a aplicação. O use indica para toda a aplicação.
app.use(express.json());

// Instanciando todas as rotas
app.use(routes);

// utilizando servidor na porta localhost
server.listen(3333);
