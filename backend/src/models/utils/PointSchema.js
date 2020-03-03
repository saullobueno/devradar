const mongoose = require('mongoose');

// Criando um tipo de schema novo
const PointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});

module.exports = PointSchema;
