import axios from 'axios';

const api = axios.create({
	// Tem q ser o mesmo IP que é mostrado na pagina do Expo q tem o QR Code + porta do backend rodando (3333)
	// Se tiver usando um emulador, podemos substituir o ip por localhost + porta ou 10.0.2.2 + porta
	baseURL: 'http://192.168.1.5:3333'
});

export default api;
