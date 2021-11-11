import React, { useEffect, useState } from 'react'

import { useTheme } from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import SecureStore from 'expo-secure-store'

import { HomeScreen } from '../screens/Home'
import { MapScreen } from '../screens/Map'
import { HOME, MAP } from './routes'
import { AppStack } from './stack'

export const Navigation = () => {
	const theme = useTheme()
	const [isNew, setIsNew] = useState<boolean>()

	useEffect(() => {
		;(async () => {
			try {
				const item = await SecureStore.getItemAsync('is_new')

				if (!item) {
					setIsNew(true)
				} else {
					setIsNew(JSON.parse(item))
				}
			} catch {
				setIsNew(true)
			}
		})()
	}, [])

	if (typeof isNew === 'undefined') {
		return <AppLoading />
	}

	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName={isNew ? HOME : MAP}
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: theme.background.main
					}
				}}
			>
				<AppStack.Screen name={HOME} component={HomeScreen} />
				<AppStack.Screen name={MAP} component={MapScreen} />
			</AppStack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
