import React from 'react';
import { View } from 'react-native';
// Serve para abrir uma página web dentro do aplicativo
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
	// pegando um parâmetro da rota anterior
	const githubUsername = navigation.getParam('github_username');

	return (
		<WebView
			style={{ flex: 1 }}
			source={{ uri: `https://github.com/${githubUsername}` }}
		/>
	);
}

export default Profile;
