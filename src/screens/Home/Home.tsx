import React from 'react'

import { useNavigation } from '@react-navigation/core'
import { setItemAsync, getItemAsync } from 'expo-secure-store'
import { ListRenderItemInfo } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import { MAP } from '../../navigation/routes'
import { Slide, SlideImage, Subtitle, TextContainer, Title } from './Home.styled'
import { Item, slides } from './slides.constants'

export const HomeScreen = () => {
	const navigator = useNavigation()
	const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
		const { backgroundColor, image, key, text, title } = item

		return (
			<Slide key={key} style={{ backgroundColor }}>
				<SlideImage source={image} />
				<TextContainer>
					<Title>{title}</Title>
					<Subtitle>{text}</Subtitle>
				</TextContainer>
			</Slide>
		)
	}

	const onDone = () => {
		setItemAsync('is_new', String(false)).then(async () => {
			console.log(await getItemAsync('is_new'))
			navigator.navigate(MAP)
		})
	}

	return (
		<AppIntroSlider
			renderItem={renderItem}
			data={slides}
			onDone={onDone}
			prevLabel="Anterior"
			nextLabel="Próximo"
			doneLabel="Finalizar"
			centerContent
			showPrevButton
		/>
	)
}

export default HomeScreen
