import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import { getItemAsync } from 'expo-secure-store'

import appImage from '../../images/recicle.png'
import { HOME, MAP } from '../../navigation/routes'
import {
	ButtonText,
	Container,
	MainImage,
	StyledButton,
	Subtitle,
	TextContainer,
	Title
} from './Initial.styled'

export const InitialScreen = () => {
	const navigation = useNavigation()
	const [isNew, setIsNew] = useState<boolean>()

	useEffect(() => {
		getItemAsync('is_new')
			.then(item => {
				!item ? setIsNew(true) : setIsNew(JSON.parse(item))
			})
			.catch(() => setIsNew(true))
	}, [])

	const handleNavigate = () => {
		const screenRoute = isNew ? HOME : MAP

		navigation.navigate(screenRoute)
	}

	return (
		<Container>
			<MainImage source={appImage} />
			<TextContainer>
				<Title>UpMeal</Title>
				<Subtitle>Diminua o desperdício</Subtitle>
			</TextContainer>
			<StyledButton rippleColor="rgba(0, 0, 0, .32)" onPress={() => handleNavigate()}>
				<ButtonText>Começar</ButtonText>
			</StyledButton>
		</Container>
	)
}

export default InitialScreen
