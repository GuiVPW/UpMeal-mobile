import React, { FC, createContext, useState, useEffect } from 'react'

import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import { api } from '../services/api'
import { Client } from '../services/entities'

export interface AuthContextProps {
	client?: Client
	token?: string
	isAuth: boolean
	isNew: boolean
	loading: boolean

	addClient: (client: Client) => Promise<void>
	changeNewStatus: (status: boolean) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AuthContext = createContext<AuthContextProps>()

export const AuthProvider: FC = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false)
	const [loading, setLoading] = useState(false)
	const [client, setClient] = useState<Client>()
	const [token, setToken] = useState<string>()
	const [isNew, setIsNew] = useState(true)

	useEffect(() => {
		async function checkAuth() {
			setLoading(true)
			try {
				const tokenReceived = await getItemAsync('token')

				if (!tokenReceived) {
					setIsAuth(false)
					setLoading(false)
				}

				const shopsData = await api.post('/clients/authenticate', {
					accessToken: tokenReceived
				})

				if (shopsData.data.client.accessId) {
					setToken(tokenReceived as string)
					setIsAuth(true)
					setIsNew(false)
				} else {
					await deleteItemAsync('token')
					setToken(undefined)
					setIsAuth(false)
				}

				setLoading(false)
			} catch {
				setToken(undefined)
				setIsAuth(false)
				await deleteItemAsync('token')
			}
		}

		checkAuth()
	}, [])

	async function addClient(givenClient: Client) {
		await setItemAsync('token', givenClient.accessId)
		setClient(client)
	}

	async function changeNewStatus(status: boolean) {
		await setItemAsync('is_new', String(status))
		setIsNew(status)
	}

	return (
		<AuthContext.Provider
			value={{
				loading,
				isAuth,
				client,
				token,
				isNew,

				changeNewStatus,
				addClient
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
