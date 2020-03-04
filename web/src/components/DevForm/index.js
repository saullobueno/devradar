import React, { useState, useEffect } from 'react';

// Enviando como props o submit do formulario, conforma abaixo
function DevForm({ onSubmit }) {
	// Estado do componente, onde mostra os itens q serão utilizados.
	const [github_username, setGithubUsername] = useState('');
	const [techs, setTechs] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	/* Pegando a latitude e longitude através de uma função do navegador q acessa a 
	Api de geolocalização. Uma vez acionada o navegador pede permissão para o usuário. */
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			// Esta função é um callback, e não async await
			// O primeiro parametro é a posição
			position => {
				const { latitude, longitude } = position.coords;
				setLatitude(latitude);
				setLongitude(longitude);
			},
			// O segundo é o erro
			err => {
				console.log(err);
			},
			// O terceiro podemos inserir outras opções (Ctrl+Espaço mostram elas). Abaixo colocamos um tempo limite para executá-lo.
			{
				timeout: 30000
			}
		);
	}, []);

	// Função para cadastrar um Dev
	async function handleSubmit(e) {
		e.preventDefault();
		await onSubmit({
			github_username,
			techs,
			latitude,
			longitude
		});
		// Setando apenas username e techs, pois latitude e longitude já foram setadas lá em cima com informações do navegador
		setGithubUsername('');
		setTechs('');
	}

	return (
		// Formulário
		<form onSubmit={handleSubmit}>
			<div className="input-block">
				<label htmlFor="github_username">Usuário do Github</label>
				<input
					name="github_username"
					id="github_username"
					required
					value={github_username}
					onChange={e => setGithubUsername(e.target.value)}
				/>
			</div>

			<div className="input-block">
				<label htmlFor="techs">Tecnologias</label>
				<input
					name="techs"
					id="techs"
					required
					value={techs}
					onChange={e => setTechs(e.target.value)}
				/>
			</div>

			<div className="input-group">
				<div className="input-block">
					<label htmlFor="latitude">Latitude</label>
					<input
						type="number"
						name="latitude"
						id="latitude"
						required
						value={latitude}
						onChange={e => setLatitude(e.target.value)}
					/>
				</div>

				<div className="input-block">
					<label htmlFor="longitude">Longitude</label>
					<input
						type="number"
						name="longitude"
						id="longitude"
						required
						value={longitude}
						onChange={e => setLongitude(e.target.value)}
					/>
				</div>
			</div>

			<button type="submit">Salvar</button>
		</form>
	);
}

export default DevForm;
