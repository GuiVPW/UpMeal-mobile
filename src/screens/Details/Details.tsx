import React, { useEffect, useState } from 'react'

import { useTheme } from 'styled-components'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import { View, ScrollView, Linking, Alert } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {
	ActivityIndicator,
	Title as PaperTitle,
	Paragraph,
	Subheading
} from 'react-native-paper'

import mapMarkerImg from '../../images/marker.png'
import { MAP } from '../../navigation/routes'
import { api } from '../../services/api'
import { Shop } from '../Map'
import {
	ContactButton,
	ContactButtonText,
	RouteContainer,
	Separator,
	Description,
	MapContainer,
	Map,
	ShopImage,
	Title,
	ReservationButtonText,
	ReservationButton
} from './Details.styled'

interface ShopDetailsRouteParams {
	id: number
}

export const DetailsScreen = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const params = route.params as ShopDetailsRouteParams
	const theme = useTheme()
	const [shop, setShop] = useState<Shop>()

	useEffect(() => {
		api
			.get(`shops/${params.id}`)
			.then(response => setShop(response.data))
			.catch(() => {
				Alert.alert('Erro de rede', 'Não foi possível buscar esse estabelecimento', [
					{ text: 'Voltar', onPress: () => navigation.navigate(MAP) },
					{ text: 'Continuar' }
				])
			})
		setShop({
			id: params.id,
			email: 'guivpw68@gmail.com',
			city: 'São Paulo',
			name: 'Bar do Manuel',
			phone: '11988900772',
			state: 'São Paulo',
			imageUrl:
				'https://ptanime.com/wp-content/uploads/2021/10/komisan_primeiras_impressoes_neko_komi.jpg',
			latitude: 123,
			longitude: 123
		})
	}, [params.id])

	if (!shop) {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		)
	}

	function handleOpenGoogleMapRoutes() {
		Linking.openURL(
			`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`
		)
	}

	async function handleWhatsapp() {
		const url = `whatsapp://send?text=Olá, desejo fazer uma reserva de alimentos&phone=${shop?.phone}`

		const access = await Linking.canOpenURL(url)

		if (!access) {
			Alert.alert(
				'Whatsapp não instalado!',
				'Você precisa ter instalado o aplicativo Whatsapp para poder enviar uma mensagem a esse estabelecimento.'
			)
		} else {
			await Linking.openURL(url)
		}
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ padding: 24 }}>
				<Title>{shop.name}</Title>

				<Description>Email: {shop.email}</Description>
				<Description>Telefone: {shop.phone}</Description>

				<Separator />

				<PaperTitle>Localização:</PaperTitle>
				<MapContainer>
					<Map
						initialRegion={{
							latitude: shop.latitude,
							longitude: shop.longitude,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008
						}}
						zoomEnabled={false}
						pitchEnabled={false}
						scrollEnabled={false}
						rotateEnabled={false}
						provider={PROVIDER_GOOGLE}
					>
						<Marker
							icon={mapMarkerImg}
							coordinate={{
								latitude: shop.latitude,
								longitude: shop.longitude
							}}
						/>
					</Map>

					<RouteContainer onPress={() => handleOpenGoogleMapRoutes()}>
						<Paragraph>Ver rotas no Google Maps</Paragraph>
					</RouteContainer>
				</MapContainer>

				<ReservationButton onPress={() => {}}>
					<FontAwesome name="calendar" size={24} color="#FFF" />

					<ReservationButtonText>Fazer uma reserva</ReservationButtonText>
				</ReservationButton>

				<ContactButton onPress={() => handleWhatsapp()}>
					<FontAwesome name="whatsapp" size={24} color="#FFF" />

					<ContactButtonText>Entrar em contato</ContactButtonText>
				</ContactButton>
			</View>
		</ScrollView>
	)
}

export default DetailsScreen
