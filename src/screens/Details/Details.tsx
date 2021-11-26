import React, { useEffect, useState } from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import { View, ScrollView, Linking, Alert } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {
	ActivityIndicator,
	Title as PaperTitle,
	Paragraph,
	Snackbar,
	Colors
} from 'react-native-paper'

import FoodTable from '../../components/FoodTable/FoodTable'
import mapMarkerImg from '../../images/marker.png'
import { MAP } from '../../navigation/routes'
import { api } from '../../services/api'
import { Shop } from '../../services/entities'
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
	const [shop, setShop] = useState<Shop>()

	const [visible, setVisible] = useState(false)
	const [successVisible, setSuccessVisible] = useState(false)
	const [reserved, setReserved] = useState(false)

	useEffect(() => {
		api
			.get(`shops/${params.id}`)
			.then(async response => {
				setShop(response.data.shop)
				try {
					const reservationResponse = await api.get(`shops/${params.id}/reservations`)

					if (reservationResponse.data.id) {
						setReserved(TRUE)
					}
				} catch (e) {
					console.error(e)
				}
			})
			.catch(() => {
				Alert.alert('Erro de rede', 'Não foi possível buscar esse estabelecimento', [
					{ text: 'Voltar', onPress: () => navigation.navigate(MAP) }
				])
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id])

	if (!shop) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color={Colors.red600} size="large" />
			</View>
		)
	}

	function handleOpenGoogleMapRoutes() {
		Linking.openURL(
			`https://www.google.com/maps/dir/?api=1&destination=${shop?.latitude},${shop?.longitude}`
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

	function handleReservation() {
		api
			.post(`/shops/${params.id}/reservations`)
			.then(() => {
				setSuccessVisible(true)
				setReserved(true)
			})
			.catch(() => setVisible(true))
	}

	function openReservation() {
		Alert.alert(
			'Fazer uma Reserva.',
			'Você deseja mesmo realizar uma reserva para esse estabelecimento?',
			[{ text: 'Sim', onPress: () => handleReservation() }, { text: 'Não' }]
		)
	}

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ padding: 24 }}>
				{shop.imageUrl && <ShopImage source={{ uri: shop.imageUrl }} />}
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

				{shop.foods && (
					<View style={{ marginTop: 16 }}>
						<PaperTitle>Alimentos:</PaperTitle>
						<FoodTable foods={shop.foods} />
					</View>
				)}

				{!reserved && (
					<ReservationButton onPress={() => openReservation()}>
						<FontAwesome name="calendar" size={24} color="#FFF" />

						<ReservationButtonText>Fazer uma reserva</ReservationButtonText>
					</ReservationButton>
				)}

				<ContactButton onPress={() => handleWhatsapp()}>
					<FontAwesome name="whatsapp" size={24} color="#FFF" />

					<ContactButtonText>Entrar em contato</ContactButtonText>
				</ContactButton>
			</View>
			<Snackbar
				visible={visible}
				onDismiss={() => setVisible(false)}
				duration={4000}
				action={{
					label: 'Fechar',
					onPress: () => {
						setVisible(false)
					}
				}}
			>
				Reserva falhou ou servidor não está conectado.
			</Snackbar>
			<Snackbar
				visible={successVisible}
				onDismiss={() => setSuccessVisible(false)}
				duration={4000}
				action={{
					label: 'Fechar',
					onPress: () => {
						setSuccessVisible(false)
					}
				}}
			>
				Reserva feita com sucesso!
			</Snackbar>
		</ScrollView>
	)
}

export default DetailsScreen
