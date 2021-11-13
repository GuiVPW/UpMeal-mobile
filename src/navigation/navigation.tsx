import React from 'react'

import { useTheme } from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'

import { DetailsScreen } from '../screens/Details'
import { HomeScreen } from '../screens/Home'
import { InitialScreen } from '../screens/Initial'
import { MapScreen } from '../screens/Map'
import { HOME, MAP, DETAILS, INITIAL } from './routes'
import { AppStack } from './stack'

export const Navigation = () => {
	const theme = useTheme()

	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName={INITIAL}
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: theme.background.main
					},
					headerBackTitle: 'Voltar',
					headerBackButtonMenuEnabled: false,
					title: ''
				}}
			>
				<AppStack.Screen name={INITIAL} component={InitialScreen} />
				<AppStack.Screen name={HOME} component={HomeScreen} />
				<AppStack.Screen name={MAP} component={MapScreen} />
				<AppStack.Screen
					name={DETAILS}
					options={{ headerShown: true }}
					component={DetailsScreen}
				/>
			</AppStack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
