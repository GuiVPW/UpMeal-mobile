import { Headline, Subheading, TouchableRipple } from 'react-native-paper'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.primary};
	padding-vertical: 20%;
`

export const MainImage = styled.Image`
	width: 200px;
	height: 200px;
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

export const StyledButton = styled(TouchableRipple)`
	background-color: ${({ theme }) => theme.colors.secondary};
	elevation: 0;
	margin-top: 24px;
	padding-vertical: 16px;
	padding-horizontal: 40px;
	border-radius: 24px;
`

export const ButtonText = styled(Headline)`
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
