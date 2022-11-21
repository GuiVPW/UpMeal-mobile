import { useContext, useState } from 'react'

import { useTheme } from 'styled-components'

import { useNavigation } from '@react-navigation/core'
import { useForm, Controller } from 'react-hook-form'
import { ActivityIndicator, Snackbar, TextInput } from 'react-native-paper'

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
	const [error, setError] = useState<{ message: string; visible: boolean }>({
		message: 'Servidor não conectado!',
		visible: false
	})
	const theme = useTheme()
	const navigation = useNavigation()
	const { addClient, changeNewStatus } = useContext(AuthContext)

	const onSubmit = async (data: SignupForm) => {
		setLoading(true)

		try {
			const response = await api.post('clients', data)

			await addClient(response.data.client)
			await changeNewStatus(true)

			navigation.navigate(INITIAL)
		} catch (e: any) {
			setError({
				visible: true,
				message: e.response?.data ?? 'Um erro desconhecido ocorreu'
			})
			setLoading(false)
		}
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
					render={({ fieldState, field: { onChange, value } }) => (
						<StyledInput
							label="Nome"
							defaultValue=""
							error={!!fieldState.error}
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
						minLength: 10,
						maxLength: 11
					}}
					render={({ fieldState, field: { onChange, value } }) => (
						<StyledInput
							label="Telefone"
							defaultValue=""
							error={!!fieldState.error}
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
					render={({ fieldState, field: { onChange, value } }) => (
						<StyledInput
							label="Cidade"
							defaultValue=""
							error={!!fieldState.error}
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
					render={({ fieldState, field: { onChange, value } }) => (
						<StyledInput
							label="Estado"
							defaultValue=""
							error={!!fieldState.error}
							placeholder="Ex: SP"
							onChangeText={text => onChange(text)}
							value={value}
							right={<TextInput.Affix text="/2" />}
							maxLength={2}
						/>
					)}
				/>
			</InputContainer>

			{loading ? (
				<ActivityIndicator animating color="white" />
			) : (
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
			)}

			<Snackbar
				visible={error.visible}
				onDismiss={() => setError({ ...error, visible: false })}
				duration={4000}
				action={{
					label: 'Fechar',
					onPress: () => {
						setError({ ...error, visible: false })
					}
				}}
			>
				Usuário já existe ou servidor não conectado.
			</Snackbar>
		</Container>
	)
}

export default SignupScreen
