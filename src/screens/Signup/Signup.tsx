import { useContext, useState } from 'react'

import { useTheme } from 'styled-components'

import { useNavigation } from '@react-navigation/core'
import { useForm, Controller } from 'react-hook-form'
import {
	ActivityIndicator,
	Button,
	Dialog,
	Paragraph,
	Text,
	Portal,
	Snackbar,
	TextInput
} from 'react-native-paper'

import { AuthContext } from '../../contexts/auth.context'
import { MAP } from '../../navigation/routes'
import { api } from '../../services/api'
import {
	ButtonText,
	Container,
	InputContainer,
	SafeScrollView,
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
	const { token, addClient, changeNewStatus } = useContext(AuthContext)
	const [visible, setVisible] = useState(false)

	const dismissAlert = () => {
		setVisible(false)
		navigation.navigate(MAP)
	}

	const onSubmit = async (data: SignupForm) => {
		setLoading(true)

		try {
			const response = await api.post('clients', data)

			await addClient(response.data.client)
			await changeNewStatus(true)
			setVisible(true)
		} catch (e: any) {
			setError({
				visible: true,
				message: e.response?.data ?? 'Um erro desconhecido ocorreu'
			})
			setLoading(false)
		}
	}

	return (
		<SafeScrollView>
			<Container behavior="padding">
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
			</Container>
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

			<Portal>
				<Dialog visible={visible} onDismiss={dismissAlert}>
					<Dialog.Title>Bem Vindo!</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							Para realizar futuros logins na UpMeal, utilize seu código de usuário:{' '}
						</Paragraph>
						<Text
							style={{
								fontWeight: 'bold',
								textTransform: 'uppercase',
								fontSize: 20,
								textAlign: 'center'
							}}
						>
							{token}
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={dismissAlert}>Fechar</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</SafeScrollView>
	)
}

export default SignupScreen
