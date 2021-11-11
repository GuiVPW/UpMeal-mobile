import React from 'react'

import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components/native'

import { Navigation } from './src/routes'
import { theme } from './src/styles/theme'

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Ubuntu_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar animated backgroundColor="transparent" translucent />
			<Navigation />
		</ThemeProvider>
	)
}
