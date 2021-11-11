import { Image, View } from 'react-native'
import { Headline, Subheading } from 'react-native-paper'
import styled from 'styled-components/native'

export const Slide = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`

export const SlideImage = styled(Image)`
	width: 320px;
	height: 200px;
	margin-top: 32px;
	margin-bottom: 32px;
`

export const TextContainer = styled(View)`
	padding-left: 24px;
	padding-right: 24px;
	justify-content: center;
`

export const Title = styled(Headline)`
	color: ${({ theme }) => theme.title.light};
	font-size: 36px;
	padding-top: 12px;
	font-weight: 700;
	text-align: center;
`

export const Subtitle = styled(Subheading)`
	color: ${({ theme }) => theme.title.light};
	font-weight: 500;
	text-align: center;
`
