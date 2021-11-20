import React, { useContext, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import { Button } from 'react-native'
import { Snackbar, TextInput } from 'react-native-paper'

import { AuthContext } from '../../contexts/auth.context'
import appImage from '../../images/icon.png'
import { MAP, SIGNUP } from '../../navigation/routes'
import { api } from '../../services/api'
import {
	ButtonText,
	Container,
	InputContainer,
	MainImage,
	StyledButton,
	Subtitle,
	TextContainer,
	Title
} from './Initial.styled'

export const InitialScreen = () => {
	const navigation = useNavigation()
	const [visible, setVisible] = useState(false)
	const [id, setId] = useState('')
	const { addClient, changeNewStatus } = useContext(AuthContext)

	const handleNavigate = () => {
		api
			.post('/clients/authenticate', { accessId: id })
			.then(async response => {
				await addClient(response.data)
				await changeNewStatus(false)

				navigation.navigate(MAP)
			})
			.catch(() => setVisible(true))
	}

	return (
		<Container>
			<MainImage source={appImage} />
			<TextContainer>
				<Title>UpMeal</Title>
				<Subtitle>Diminuindo o desperdício</Subtitle>
			</TextContainer>
			<InputContainer>
				<TextInput
					value={id}
					label="Insira seu ID:"
					onChangeText={text => setId(text)}
					placeholder="Ex: b74b0818..."
				/>
			</InputContainer>
			<StyledButton rippleColor="rgba(0, 0, 0, .32)" onPress={() => handleNavigate()}>
				<ButtonText>Começar</ButtonText>
			</StyledButton>
			<Button
				title="Não tenho cadastro."
				color="white"
				onPress={() => navigation.navigate(SIGNUP)}
			/>
			<Snackbar
				visible={visible}
				onDismiss={() => setVisible(false)}
				duration={4000}
				action={{
					label: 'Fechar',
					onPress: () => {
						setVisible(false)
					}
				}}
			>
				ID inválido ou servidor não está conectado.
			</Snackbar>
		</Container>
	)
}

export default InitialScreen
