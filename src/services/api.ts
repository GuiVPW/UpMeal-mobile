import { Axios } from 'axios'

const { API_URL } = process.env

export const api = new Axios({ baseURL: API_URL || '127.0.0.1:3333', timeout: 5000 })
