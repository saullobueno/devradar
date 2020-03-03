// Cada model representa uma entidade da aplicação

const mongoose = require('mongoose');

// Importando o tipo de schema novo criado
const PointSchema = require('./utils/PointSchema');

// Estruturação de uma entidade
const DevSchema = new mongoose.Schema({
	// Campos da entidade - Nome e tipo
	name: String,
	github_username: String,
	bio: String,
	avatar_url: String,
	techs: [String],
	location: {
		type: PointSchema,
		index: '2dsphere' // tipo descrito na documentação para localizações
	}
});

// Exportando o model
module.exports = mongoose.model('Dev', DevSchema);
