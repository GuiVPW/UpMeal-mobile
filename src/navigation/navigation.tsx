import React, { useContext } from 'react'

import { useTheme } from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import { AuthContext } from '../contexts/auth.context'
import { DetailsScreen } from '../screens/Details'
import { HomeScreen } from '../screens/Home'
import { InitialScreen } from '../screens/Initial'
import { MapScreen } from '../screens/Map'
import { SignupScreen } from '../screens/Signup'
import { HOME, MAP, DETAILS, INITIAL, SIGNUP } from './routes'
import { AppStack } from './stack'

export const Navigation = () => {
	const theme = useTheme()
	const { isAuth, loading } = useContext(AuthContext)

	if (loading) {
		return <AppLoading autoHideSplash />
	}

	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName={isAuth ? MAP : INITIAL}
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
					options={{
						headerShown: true,
						headerStyle: {
							backgroundColor: theme.colors.primary
						},
						headerTintColor: '#fff',
						headerShadowVisible: false
					}}
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
