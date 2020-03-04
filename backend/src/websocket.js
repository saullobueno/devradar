// biblioteca para utilizar websockets e enviar informações para o frontend
const socketio = require('socket.io');

// Função para tranbsformar string em array separada por virgula e espaço
const parseStringAsArray = require('./utils/parseStringAsArray');

// Função para calcular a distancia entre dois pontos
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

// conexao websocket e opções
exports.setupWebsocket = server => {
	io = socketio(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude)
			},
			techs: parseStringAsArray(techs)
		});
	});
};

// filtrando devs q estao a menos de 10km
exports.findConnections = (coordinates, techs) => {
	return connections.filter(connection => {
		return (
			calculateDistance(coordinates, connection.coordinates) < 10 &&
			connection.techs.some(item => techs.includes(item))
		);
	});
};

// criando menssagem de envio caso passe pelo filtro
exports.sendMessage = (to, message, data) => {
	to.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};
