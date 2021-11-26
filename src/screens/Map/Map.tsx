/* eslint-disable indent */
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
import { ActivityIndicator } from 'react-native-paper'

import marker from '../../images/marker.png'
import { api } from '../../services/api'
import { Shop } from '../../services/entities'
import {
	CalloutContainer,
	CalloutText,
	CustomSearchbar,
	Map,
	ScreenContainer,
	SearchContainer
} from './Map.styled'
import mapStyle from './map.style.json'

export const MapScreen = () => {
	const navigation = useNavigation()
	const [search, setSearch] = useState<string>('')
	const [position, setPosition] = useState<[number, number]>([0, 0])
	const [location, setLocation] = useState<{
		city?: string | null
		region?: string | null
	}>({})
	const [shops, setShops] = useState<
		Pick<Shop, 'id' | 'imageUrl' | 'name' | 'latitude' | 'longitude'>[]
	>([])

	async function fetchShops(q?: string) {
		try {
			const response = await api.get('/shops', {
				params: {
					name: q
				}
			})

			if (response.data) {
				setShops(response.data.shops)
			}
		} catch {
			Alert.alert('Erro de Rede!', 'Não foi possível buscar os estabelecimentos!')
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
		fetchShops()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function handleNavigateToDetails(id: number) {
		navigation.navigate('Details', { id })
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearch = useCallback(
		debounce(query => fetchShops(query), 700),
		[]
	)

	return (
		<ScreenContainer>
			<SearchContainer>
				<CustomSearchbar
					value={search}
					onChangeText={query => {
						setSearch(query)
						debouncedSearch(query)
					}}
					inputStyle={{ fontSize: 16 }}
					placeholder="Ex: Mercadão do Douglas"
				/>
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
					{shops &&
						shops.map(({ id, imageUrl, name, ...coords }) => (
							<Marker
								key={id}
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
