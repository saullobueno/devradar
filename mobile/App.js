import React from 'react';
// Importanto statusbar (onde fica o simbolo da bateria e relogio)
// Yellowbox serve para ignorar os warnings que aparecem
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

// Ignorando warnings que começam com a string passada
YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
	return (
		<>
			{/* Estilizando a status bar */}
			<StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
			<Routes />
		</>
	);
}
