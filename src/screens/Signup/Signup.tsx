import React, { useContext, useState } from 'react'

import { useTheme } from 'styled-components'

import { useNavigation } from '@react-navigation/core'
import { useForm, Controller } from 'react-hook-form'
import { Alert } from 'react-native'
import { Snackbar, TextInput } from 'react-native-paper'

import { AuthContext } from '../../contexts/auth.context'
import { INITIAL } from '../../navigation/routes'
import { api } from '../../services/api'
import {
	ButtonText,
	Container,
	InputContainer,
	StyledButton,
	StyledInput,
	Subtitle,
	TextContainer,
	Title
} from './Signup.styled'

interface SignupForm {
	name: string
	phone: string
	city: string
	state: string
}

export const SignupScreen = () => {
	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<SignupForm>({ mode: 'onChange' })
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const theme = useTheme()
	const navigation = useNavigation()
	const { addClient, changeNewStatus } = useContext(AuthContext)

	const onSubmit = (data: SignupForm) => {
		setLoading(true)

		api
			.post('/clients', data)
			.then(async response => {
				await addClient(response.data)
				await changeNewStatus(true)

				Alert.alert(
					`Bem-vindo!`,
					`Seja muito bem vindo ao UpMeal!! Agora você só precisa guardar o seu acesso único e aproveitar tudo que temos a oferecer!`
				)

				Alert.alert('Id de acesso:', response.data.accessId)

				navigation.navigate(INITIAL)
			})
			.catch(async () => {
				setVisible(true)
			})

		setLoading(false)
	}

	return (
		<Container>
			<TextContainer>
				<Title>Cadastro</Title>
				<Subtitle>Crie uma conta como cliente para começar a mudança!</Subtitle>
			</TextContainer>

			<InputContainer>
				<Controller
					control={control}
					name="name"
					rules={{
						required: true
					}}
					render={({ fieldState: { error }, field: { onChange, value } }) => (
						<StyledInput
							label="Nome"
							defaultValue=""
							error={!!error}
							placeholder="Ex: Guilherme Vieira"
							onChangeText={text => onChange(text)}
							value={value}
						/>
					)}
				/>
				<Controller
					control={control}
					name="phone"
					rules={{
						required: true,
						minLength: 11,
						maxLength: 11
					}}
					render={({ fieldState: { error }, field: { onChange, value } }) => (
						<StyledInput
							label="Telefone"
							defaultValue=""
							error={!!error}
							placeholder="Ex: 11988900772"
							onChangeText={text => onChange(text)}
							value={value}
							maxLength={11}
						/>
					)}
				/>
				<Controller
					control={control}
					name="city"
					rules={{
						required: true
					}}
					render={({ fieldState: { error }, field: { onChange, value } }) => (
						<StyledInput
							label="Cidade"
							defaultValue=""
							error={!!error}
							placeholder="Ex: Guarulhos"
							onChangeText={text => onChange(text)}
							value={value}
						/>
					)}
				/>
				<Controller
					control={control}
					name="state"
					rules={{
						required: true,
						minLength: 2,
						maxLength: 2
					}}
					render={({ fieldState: { error }, field: { onChange, value } }) => (
						<StyledInput
							label="Estado"
							defaultValue=""
							error={!!error}
							placeholder="Ex: SP"
							onChangeText={text => onChange(text)}
							value={value}
							right={<TextInput.Affix text="/2" />}
							maxLength={2}
						/>
					)}
				/>
			</InputContainer>

			<StyledButton
				loading={loading}
				style={{
					backgroundColor: isValid ? theme.colors.secondary : theme.input.placeholder
				}}
				disabled={!isValid}
				onPress={handleSubmit(onSubmit)}
			>
				<ButtonText valid={isValid}>Começar</ButtonText>
			</StyledButton>
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
				Usuário já existe ou servidor não conectado.
			</Snackbar>
		</Container>
	)
}

export default SignupScreen
