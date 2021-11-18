import React, { useEffect, useState } from 'react'

import { useTheme } from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'
import { getItemAsync } from 'expo-secure-store'

import { DetailsScreen } from '../screens/Details'
import { HomeScreen } from '../screens/Home'
import { InitialScreen } from '../screens/Initial'
import { MapScreen } from '../screens/Map'
import { SignupScreen } from '../screens/Signup'
import { HOME, MAP, DETAILS, INITIAL, SIGNUP } from './routes'
import { AppStack } from './stack'

export const Navigation = () => {
	const theme = useTheme()
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		async function getToken() {
			const accessId = await getItemAsync('token')

			if (!accessId) {
				return setIsAuth(false)
			}

			return setIsAuth(true)
		}

		getToken()
	}, [])

	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName={isAuth ? INITIAL : MAP}
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
				<AppStack.Screen
					name={SIGNUP}
					component={SignupScreen}
					options={{ headerShown: true }}
				/>
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
