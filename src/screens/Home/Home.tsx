import React from 'react'

import { useNavigation } from '@react-navigation/core'
import { ListRenderItemInfo } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import { MAP } from '../../routes/routes'
import { Slide, SlideImage, Subtitle, TextContainer, Title } from './Home.styled'
import { Item, slides } from './slides.constants'

export const HomeScreen = () => {
	const navigator = useNavigation()
	const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
		const { backgroundColor, imageUri, key, text, title } = item

		return (
			<Slide key={key} style={{ backgroundColor }}>
				<SlideImage source={{ uri: imageUri }} />
				<TextContainer>
					<Title>{title}</Title>
					<Subtitle>{text}</Subtitle>
				</TextContainer>
			</Slide>
		)
	}

	const onDone = () => navigator.navigate(MAP)

	return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
}

export default HomeScreen
