import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
	createStackNavigator(
		{
			// Nome da rota
			Main: {
				// Componente da rota
				screen: Main,
				// Mais opções
				navigationOptions: {
					// Titulo que aparecerá
					title: 'DevRadar'
				}
			},
			// O mesmo do de cima
			Profile: {
				screen: Profile,
				navigationOptions: {
					title: 'Perfil no Github'
				}
			}
		},
		{
			// Opções padrões aplicadas a todas as telas
			defaultNavigationOptions: {
				// Cor do titulo
				headerTintColor: '#FFF',
				// Tira o titulo da página anterior
				headerBackTitleVisible: false,
				// CSS do container
				headerStyle: {
					backgroundColor: '#7D40E7'
				}
			}
		}
	)
);

export default Routes;
