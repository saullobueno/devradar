import axios from 'axios';

// Setando url base para acesso ao backend
const api = axios.create({
	baseURL: 'http://localhost:3333'
});

export default api;
