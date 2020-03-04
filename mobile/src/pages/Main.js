import React, { useState, useEffect } from 'react';
// Elementos do ReactNative que substituem as tags do HTML e add outras extras
import {
	StyleSheet,
	Image,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
// Importanto o mapa, marcações e callout (tudo oq aparece quando clicamos nas marcações)
import MapView, { Marker, Callout } from 'react-native-maps';
// pedir permissões para ver a localização e depois pegar
import {
	requestPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location';
// importando icones do MaterialIcons
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

function Main({ navigation }) {
	// Estados da aplicação
	const [devs, setDevs] = useState([]);
	const [currentRegion, setCurrentRegion] = useState(null); // regiao do mapa atual
	const [techs, setTechs] = useState('');

	useEffect(() => {
		// Carregar a posição inicial do mapa
		async function loadInitialPosition() {
			// setando se ele deu permissão de localização
			const { granted } = await requestPermissionsAsync();

			// Se deu permissão...
			if (granted) {
				// aqui pegamos os dados das coordenadas
				const { coords } = await getCurrentPositionAsync({
					// esta opção dar uma localização mais precisa, mas precisa do GPS ligado
					enableHighAccuracy: true
				});

				// Das coordenadas pegamos a latitude e longitude
				const { latitude, longitude } = coords;

				// Calculos navais pra dar zoom na tela (0.04 é u valor bom, fica a gosto)
				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				});
			}
		}

		loadInitialPosition();
	}, []);

	useEffect(() => {
		subscribeToNewDevs(dev => setDevs([...devs, dev]));
	}, [devs]);

	function setupWebsocket() {
		disconnect();

		const { latitude, longitude } = currentRegion;

		connect(latitude, longitude, techs);
	}

	async function loadDevs() {
		const { latitude, longitude } = currentRegion;

		const response = await api.get('/search', {
			// passando os parametros
			params: {
				latitude,
				longitude,
				techs
			}
		});
		// No backend ele retorna o conteudo dentro de data.devs e nao somente data
		setDevs(response.data.devs);
		setupWebsocket();
	}

	function handleRegionChanged(region) {
		setCurrentRegion(region);
	}

	// ele so vai carregar o mapa quando tiver as informações de localização
	if (!currentRegion) {
		return null;
	}

	return (
		<>
			<MapView
				// muda a região quando o mapa é movido
				onRegionChangeComplete={handleRegionChanged}
				// regiao inicial
				initialRegion={currentRegion}
				style={styles.map}
			>
				{/* Carregando devs */}
				{devs.map(dev => (
					// Marcações dos Devs no mapa
					<Marker
						key={dev._id}
						coordinate={{
							longitude: dev.location.coordinates[0],
							latitude: dev.location.coordinates[1]
						}}
					>
						{/* Imagem da marcação */}
						<Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

						{/* Balão que é mostrado quando a marcação é clicada. OnPress dele dá link para ele */}
						<Callout
							onPress={() => {
								navigation.navigate('Profile', {
									github_username: dev.github_username
								});
							}}
						>
							<View style={styles.callout}>
								<Text style={styles.devName}>{dev.name}</Text>
								<Text style={styles.devBio}>{dev.bio}</Text>
								<Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			{/* Input de busca dos Devs por tecnologias. Para ficar por cima do mapa é bom colocá-lo depois no codigo */}
			<View style={styles.searchForm}>
				<TextInput
					style={styles.searchInput}
					placeholder="Buscar devs por techs..."
					placeholderTextColor="#999"
					// colocar primeira letra em caixa alta
					autoCapitalize="words"
					// Não tentar corrigir o texto de forma padrão
					autoCorrect={false}
					value={techs}
					onChangeText={setTechs}
				/>
				{/* TouchableOpacity é um botao sem estilização propria, vc mesmo cria, o Button não */}
				<TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
					<MaterialIcons name="my-location" size={20} color="#FFF" />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	// todas as estilizações no ReactNative já possuem display:flex por padrão, flex ou none.

	map: {
		flex: 1
	},

	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#FFF'
	},

	callout: {
		width: 260
	},

	devName: {
		fontWeight: 'bold',
		fontSize: 16
	},

	devBio: {
		color: '#666',
		marginTop: 5
	},

	devTechs: {
		marginTop: 5
	},

	searchForm: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: 'row'
	},

	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#FFF',
		color: '#333',
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4
		},
		// elevação de sombras
		elevation: 2
	},

	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8E4Dff',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15
	}
});

export default Main;
