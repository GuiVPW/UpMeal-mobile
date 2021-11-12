import React, { useCallback, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/core'
import {
	getCurrentPositionAsync,
	requestForegroundPermissionsAsync,
	reverseGeocodeAsync
} from 'expo-location'
import debounce from 'lodash.debounce'
import { Alert, Platform } from 'react-native'
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ActivityIndicator, IconButton } from 'react-native-paper'

import marker from '../../images/marker.png'
import { api } from '../../services/api'
import {
	CalloutContainer,
	CalloutText,
	CustomSearchbar,
	Map,
	ScreenContainer,
	SearchContainer
} from './Map.styled'
import mapStyle from './map.style.json'

interface Shop {
	id: number
	name: string
	imageUrl: string
	latitude: number
	longitude: number
}

export const MapScreen = () => {
	const navigation = useNavigation()
	const [search, setSearch] = useState<string>('')
	const [position, setPosition] = useState<[number, number]>([0, 0])
	const [location, setLocation] = useState<{
		city?: string | null
		region?: string | null
	}>({})
	const [shops, setShops] = useState<Shop[]>([
		{
			id: 1,
			imageUrl:
				'https://png.pngtree.com/png-vector/20190118/ourlarge/pngtree-vector-shop-icon-png-image_327584.jpg',
			name: 'Bar do Manuel',
			latitude: 37.785834,
			longitude: -122.406417
		}
	])

	async function fetchShops() {
		try {
			const { data } = await api.get('/shops', {
				params: {
					name: search
				}
			})

			if (data) {
				setShops(data)
			}
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		async function loadPosition() {
			const { status } = await requestForegroundPermissionsAsync()

			if (status !== 'granted') {
				Alert.alert(
					'Ops!',
					'É necessário autorizar o uso do GPS para podemos obter sua localização'
				)
				return
			}

			const currentPosition = await getCurrentPositionAsync()

			const { latitude, longitude } = currentPosition.coords

			const [{ city, region }] = await reverseGeocodeAsync({ latitude, longitude })

			setLocation({ city, region })
			setPosition([latitude, longitude])
		}

		loadPosition()
		// fetchShops()
	}, [])

	function handleNavigateToDetails(id: number) {
		Alert.alert('Clique capturado!!', `Você clicou no marker com o id ${id}`)
		// navigation.navigate('Details', { shop_id: id })
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const debouncedSearch = useCallback(
		debounce(() => {
			// fetchShops()
		}, 300),
		[]
	)

	return (
		<ScreenContainer>
			<SearchContainer>
				<CustomSearchbar
					value={search}
					onChangeText={query => {
						setSearch(query)
						debouncedSearch()
					}}
					inputStyle={{ fontSize: 16 }}
					placeholder="Ex: Mercadão do Douglas"
				/>

				<IconButton size={56} icon="" onPress={() => console.log('pressed')} />
			</SearchContainer>
			{position[0] !== 0 ? (
				<Map
					mapType={Platform.OS === 'android' ? 'none' : 'standard'}
					initialRegion={{
						latitude: position[0],
						longitude: position[1],
						latitudeDelta: 0.008,
						longitudeDelta: 0.008
					}}
					showsIndoors={false}
					showsBuildings={false}
					loadingEnabled={position[0] === 0}
					cacheEnabled
					provider={PROVIDER_GOOGLE}
					customMapStyle={mapStyle}
				>
					{shops.map(({ id, imageUrl, name, ...coords }) => (
						<Marker
							key={id}
							onPress={() => handleNavigateToDetails(id)}
							coordinate={coords}
							icon={marker}
							calloutAnchor={{ x: 0.5, y: 0 }}
						>
							<Callout
								style={{ elevation: 0, borderRadius: 16 }}
								onPress={() => handleNavigateToDetails(id)}
							>
								<CalloutContainer>
									<CalloutText>{name}</CalloutText>
								</CalloutContainer>
							</Callout>
						</Marker>
					))}
				</Map>
			) : (
				<ActivityIndicator animating />
			)}
		</ScreenContainer>
	)
}

export default MapScreen
