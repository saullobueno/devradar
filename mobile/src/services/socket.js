// importando o socke.io na versao client
import socketio from 'socket.io-client';

// passando o endereço do backend
const socket = socketio('http://192.168.1.5:3333', {
	autoConnect: false
});

// ouve o evento de novo dev cadastrado e dispara a subcribefunction
function subscribeToNewDevs(subcribeFunction) {
	socket.on('new-dev', subcribeFunction);
}

function connect(latitude, longitude, techs) {
	// parametros para o backend a fim de filtrar quando recebera novas informações
	socket.io.opts.query = {
		latitude,
		longitude,
		techs
	};

	socket.connect();
}

function disconnect() {
	if (socket.connected) {
		socket.disconnect();
	}
}

export { connect, disconnect, subscribeToNewDevs };
