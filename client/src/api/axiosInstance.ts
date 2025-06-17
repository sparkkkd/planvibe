import axios, { type AxiosInstance } from 'axios'

let axiosInstance: AxiosInstance | null = null

export const createAxiosInstance = (
	getAccessToken: () => string | null
): AxiosInstance => {
	const instance = axios.create({
		baseURL: 'http://localhost:3000',
		withCredentials: true,
	})

	instance.interceptors.request.use((config) => {
		const token = getAccessToken()

		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`
		}

		return config
	})

	axiosInstance = instance

	return instance
}

export const getAxiosInstance = (): AxiosInstance => {
	if (!axiosInstance) throw new Error('Axios instance не инициализирован')
	return axiosInstance
}
