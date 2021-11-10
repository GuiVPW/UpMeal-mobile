import { NavigationContainer } from '@react-navigation/native'
import { AppStack } from './stack'
import { useTheme } from 'styled-components'
import { HOME } from './routes'
import HomeScreen from '../screens/Home'

export const Navigation = () => {
	const theme = useTheme()

	return (
		<NavigationContainer>
			<AppStack.Navigator
				screenOptions={{
					contentStyle: {
						backgroundColor: theme.background.main
					}
				}}
			>
				<AppStack.Screen name={HOME} component={HomeScreen} />
				{/* <AppStack.Screen name="Home" component={Home} />
				<AppStack.Screen name="Points" component={Points} />
				<AppStack.Screen name="Detail" component={Detail} /> */}
			</AppStack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
