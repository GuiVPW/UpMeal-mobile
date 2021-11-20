import { Axios } from 'axios'
import { getItemAsync } from 'expo-secure-store'

const { API_URL } = process.env

export const api = new Axios({
	baseURL: API_URL || 'http://127.0.0.1:8080/api/rest',
	timeout: 5000,
	headers: {
		'Content-type': 'application/json'
	},
	validateStatus: status => status >= 200 && status < 400,
	transformRequest: [
		function transformRequest(data) {
			if (data && JSON.stringify(data)) {
				const formattedData = JSON.stringify(data)

				return formattedData
			}

			return data
		}
	],
	transformResponse: [
		function transformResponse(data) {
			return JSON.parse(data)
		}
	]
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
