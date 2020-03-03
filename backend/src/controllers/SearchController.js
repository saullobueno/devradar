const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	// Busca de Devs no raio de 10km filtrando por tecnologias
	async index(request, response) {
		const { latitude, longitude, techs } = request.query;

		const techsArray = parseStringAsArray(techs);

		const devs = await Dev.find({
			// FILTROS

			// Filtrando por techs, usando o operador logico $in do MongoDB, significa "dentro de"
			techs: {
				$in: techsArray
			},

			// Filtrar pela localização tambem
			location: {
				// procurar perto de uma localização
				$near: {
					// Ponto inicial
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude]
					},
					// Distancia do ponto inicial em metros
					$maxDistance: 10000
				}
			}
		});

		return response.json({ devs });
	}
};
