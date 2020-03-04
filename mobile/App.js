import React from 'react';
// Importanto statusbar (onde fica o simbolo da bateria e relogio)
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

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
