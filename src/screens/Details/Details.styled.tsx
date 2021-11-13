import { Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { Button, Caption, Divider, Headline, Paragraph } from 'react-native-paper'
import styled from 'styled-components/native'

export const Title = styled(Headline)`
	color: ${({ theme }) => theme.title.secondary};
	font-size: 30px;
	font-weight: 700;
	margin-bottom: 12px;
`

export const Description = styled(Caption)`
	font-size: 16px;
`

export const ShopImage = styled.Image`
	width: ${Dimensions.get('screen').width}px;
	height: 240px;
	margin: -24px -24px 24px;
	resize-mode: cover;
`

export const MapContainer = styled.View`
	margin-top: 10px;
	overflow: hidden;
	background-color: ${({ theme }) => theme.background.main};
	border-radius: 16px;
`

export const Map = styled(MapView)`
	width: 100%;
	height: 150px;
`

export const RouteContainer = styled(Button)`
	padding: 16px;
	align-items: center;
	justify-content: center;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
`

export const ContactButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.green};
	border-radius: 20px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 56px;
`

export const ContactButtonText = styled(Paragraph)`
	color: ${({ theme }) => theme.title.light};
	font-size: 16px;
	margin-left: 16px;
`

export const ReservationButton = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.red};
	border-radius: 20px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 56px;
	margin-top: 24px;
	margin-bottom: 16px;
`

export const ReservationButtonText = styled(Paragraph)`
	color: ${({ theme }) => theme.title.light};
	font-size: 16px;
	margin-left: 16px;
`

export const Separator = styled(Divider)`
	border-width: 0.5px;
	border-color: ${({ theme }) => theme.colors.border};
	height: 0.8px;
	width: 100%;
	background-color: ${({ theme }) => theme.background.main};
	margin-vertical: 20px;
`
