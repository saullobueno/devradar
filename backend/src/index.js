const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// Importando as rotas do arquivo
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Conectando banco de dados não-relacional, o MongoDB, através do mongodb.com.
// Instalar mongosse
// Substituir o <password> pela senha da conta
mongoose.connect(
	'mongodb+srv://saullobueno:<password>@cluster0-cc8ik.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.use(cors());

// Falando para o express entender JSON em toda a aplicação. O use indica para toda a aplicação.
app.use(express.json());

// Instanciando todas as rotas
app.use(routes);

// porta localhost
server.listen(3333);