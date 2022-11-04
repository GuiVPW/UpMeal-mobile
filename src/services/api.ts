import { Axios } from 'axios'
import { getItemAsync } from 'expo-secure-store'

const { API_URL } = process.env

export const api = new Axios({
	baseURL: API_URL,
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
			try {
				return JSON.parse(data)
			} catch {
				return data
			}
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
