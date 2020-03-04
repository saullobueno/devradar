const axios = require('axios'); // Biblioteca para requisições HTTP
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
	// Método HTTP: GET, POST, PUT, DELETE
	// Query Params: request.query (Feito através da url para: filtros, ordenação, paginação, etc. Ex: ?search=saullo)
	// Routes Params: request.params (Identificar um recurso na alteração ou remoção. Ex: users/:id)
	// Body: request.body (Dados no corpo da requisição para criação ou alteração de registro)
	// Nomes comuns para métodos do Controller: index(lista), show(lista apenas um), store(criar), update(alterar), destroy(deletar)

	// fazendo requisição
	async index(request, response) {
		// listando dados com metodo find()
		const devs = await Dev.find();

		// respondendo em formato json
		return response.json(devs);
	},

	async store(request, response) {
		// Pegando os dados do campo da requisição
		const { github_username, techs, latitude, longitude } = request.body;

		// Procurando se o Dev da requisição já existe e colocando em uma variável
		let dev = await Dev.findOne({ github_username });

		// Se não existe, faz a requisição dos dados enviados
		if (!dev) {
			const apiResponse = await axios.get(
				`https://api.github.com/users/${github_username}`
			);

			// Setando os dados em variáveis e colocando o name com valor padrão e igual a login caso não exista
			const { name = login, avatar_url, bio } = apiResponse.data;

			// Função criada para converter uma string em uma array separando pela vírgula e retirando os espaços ao redor
			const techsArray = parseStringAsArray(techs);

			// pegando os valores da longitude e latitude (longitude tem q vir primeiro, de acordo com o MongoDB)
			const location = {
				type: 'Point',
				coordinates: [longitude, latitude]
			};

			// colocando a criação do novo Dev em uma variável
			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location
			});

			// Filtrar as conexões que estão há no máximo 10km de distância
			// e que o novo dev tenha pelo menos uma das tecnologias filtradas, para o websocket
			const sendSocketMessageTo = findConnections(
				{ latitude, longitude },
				techsArray
			);

			sendMessage(sendSocketMessageTo, 'new-dev', dev);
		}

		// Retornando a criação
		return response.json(dev);
	},

	// FALTA DESENVOLVER...

	// Alterar
	async update() {},

	// Deletar
	async destroy() {}
};
