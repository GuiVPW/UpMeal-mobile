import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button, Colors, Headline, Subheading } from 'react-native-paper'
import styled from 'styled-components/native'

export const SafeView = styled(ScrollView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.primary};
	padding-vertical: 20%;
`

export const Container = styled(KeyboardAvoidingView)`
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`

export const ImageContainer = styled.View`
	margin-bottom: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const MainImage = styled.Image`
	width: 250px;
`

export const TextContainer = styled.View`
	padding-left: 24px;
	padding-right: 24px;
	justify-content: center;
`

export const Title = styled(Headline)`
	color: ${({ theme }) => theme.title.light};
	font-size: 44px;
	padding-top: 12px;
	font-weight: 700;
	text-align: center;
`

export const StyledButton = styled(Button)`
	background-color: ${({ theme, disabled }) =>
		disabled ? Colors.grey500 : theme.colors.secondary};
	elevation: 0;
	width: 40%;
	border-radius: 24px;
`

export const ButtonText = styled(Subheading)`
	font-weight: 700;
	color: ${({ theme }) => theme.title.light};
	text-transform: uppercase;
`

export const Subtitle = styled(Subheading)`
	color: ${({ theme }) => theme.title.light};
	font-size: 20px;
	font-weight: 500;
	text-align: center;
	margin-top: 8px;
`

export const InputContainer = styled.View`
	padding: 16px;
	width: 100%;
`
