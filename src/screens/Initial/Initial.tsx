import React, { useContext, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import { Image } from 'react-native'
import { Button, Snackbar, TextInput, ActivityIndicator } from 'react-native-paper'

import { AuthContext } from '../../contexts/auth.context'
import appImage from '../../images/icon.png'
import { MAP, SIGNUP } from '../../navigation/routes'
import { api } from '../../services/api'
import {
	ButtonText,
	Container,
	ImageContainer,
	InputContainer,
	SafeView,
	StyledButton,
	Subtitle,
	TextContainer,
	Title
} from './Initial.styled'

export const InitialScreen = () => {
	const navigation = useNavigation()
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [id, setId] = useState('')
	const { addClient, changeNewStatus } = useContext(AuthContext)

	const handleNavigate = () => {
		setLoading(true)
		api
			.post('/clients/authenticate', { accessToken: id })
			.then(async response => {
				await addClient(response.data.client)
				await changeNewStatus(false)
				setLoading(false)

				navigation.navigate(MAP)
			})
			.catch(() => {
				setLoading(false)
				setVisible(true)
			})
	}

	return (
		<SafeView>
			<Container behavior="padding">
				<ImageContainer>
					<Image source={appImage} />
				</ImageContainer>
				<TextContainer>
					<Title>UpMeal</Title>
					<Subtitle>Diminuindo o desperdício</Subtitle>
				</TextContainer>
				<InputContainer>
					<TextInput
						value={id}
						label="Insira seu ID:"
						onChangeText={text => setId(text)}
						placeholder="Ex: b7c4d2z"
					/>
				</InputContainer>

				{loading ? (
					<ActivityIndicator animating color="white" />
				) : (
					<StyledButton
						onPress={() => handleNavigate()}
						mode="contained"
						disabled={loading}
					>
						<ButtonText>Começar</ButtonText>
					</StyledButton>
				)}
				<Button color="white" onPress={() => navigation.navigate(SIGNUP)}>
					Não tenho cadastro.
				</Button>
			</Container>
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
		</SafeView>
	)
}

export default InitialScreen
