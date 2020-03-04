import React, { useState, useEffect } from 'react';
import api from './services/api';

// CSS principais da aplicação
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// Carregando componmentes externos
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
	// Estado deste componente
	const [devs, setDevs] = useState([]);

	// carregando lista de devs do backend através da url /devs
	useEffect(() => {
		async function loadDevs() {
			const response = await api.get('/devs');
			// apos carregar ele seta o estado com os dados
			setDevs(response.data);
		}
		// A função acima deve ser executada conforme abaixo
		loadDevs();
	}, []);

	// adicionando devs
	async function handleAddDev(data) {
		const response = await api.post('/devs', data);
		// Abaixo ele apenas atualiza a lista de devs para ser renderizada na hora do cadastro
		setDevs([...devs, response.data]);
	}

	return (
		<div id="app">
			<aside>
				<strong>Cadastrar</strong>
				{/* Abaixo é o componente do form carregando a função deste componente q faz o cadastro */}
				<DevForm onSubmit={handleAddDev} />
			</aside>

			<main>
				<ul>
					{/* Abaixo ele renderiza os devs carregando do estado do componente */}
					{devs.map(dev => (
						<DevItem key={dev._id} dev={dev} />
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;
