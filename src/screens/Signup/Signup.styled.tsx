import { Dimensions } from 'react-native'
import { Button, Headline, Subheading, TextInput } from 'react-native-paper'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primary};
	padding-vertical: 20px;
	height: ${Dimensions.get('screen').height}px;
`

export const MainImage = styled.Image`
	width: 30%;
	height: 30%;
	margin-bottom: 32px;
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
	elevation: 0;
	padding-vertical: 4px;
	padding-horizontal: 40px;
	border-radius: 24px;
`

export const ButtonText = styled(Subheading).withConfig<{ valid?: boolean }>({})`
	font-weight: 700;
	color: ${({ theme, valid }) => (valid ? theme.title.light : theme.title.disabled)};
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
	padding: 24px;
	width: 100%;
`

export const StyledInput = styled(TextInput)`
	margin-vertical: 8px;
	border-radius: 4px;
`
