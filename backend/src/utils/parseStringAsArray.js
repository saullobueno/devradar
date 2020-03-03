// Função criada para converter uma string em uma array separando pela vírgula e retirando os espaços ao redor
module.exports = function parseStringAsArray(arrayAsString) {
	return arrayAsString.split(',').map(tech => tech.trim());
};
