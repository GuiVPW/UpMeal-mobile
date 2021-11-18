import { Axios } from 'axios'
import { getItemAsync } from 'expo-secure-store'

const { API_URL } = process.env

export const api = new Axios({
	baseURL: API_URL || '127.0.0.1:3333/api/rest',
	timeout: 5000
})

api.interceptors.request.use(async config => {
	const { headers } = config

	const token = await getItemAsync('token')

	if (token) {
		const newHeaders = { ...headers, Authorization: token }

		config.headers = newHeaders
	}

	return config
})
