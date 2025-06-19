import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { getAxiosInstance } from './axiosInstance'
import { setAccessToken } from '../store/slices/authSlice/authSlice'

const mutex = new Mutex()

export const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string
			method?: AxiosRequestConfig['method']
			data?: AxiosRequestConfig['data']
			params?: AxiosRequestConfig['params']
		},
		unknown,
		unknown
	> =>
	async (args, api) => {
		await mutex.waitForUnlock()

		const axios = getAxiosInstance()

		try {
			const response = await axios({ ...args })
			return { data: response.data }
		} catch (error) {
			const err = error as AxiosError

			if (err.response?.status === 401) {
				if (!mutex.isLocked()) {
					const release = await mutex.acquire()
					try {
						const refreshResponse = await axios.get('/auth/refresh')

						const newAccessToken = (
							refreshResponse.data as { accessToken: string }
						).accessToken

						api.dispatch(setAccessToken(newAccessToken))

						const retryResponse = await axios({ ...args })

						return { data: retryResponse.data }
					} catch (refreshError) {
						return {
							error: {
								status: 401,
								data: 'Unauthorized',
							},
						}
					} finally {
						release()
					}
				} else {
					await mutex.waitForUnlock()

					try {
						const retryResponse = await axios({ ...args })
						return { data: retryResponse.data }
					} catch (retryError) {
						const retryErr = retryError as AxiosError
						return {
							error: {
								status: retryErr.response?.status,
								data: retryErr.response?.data || retryErr.message,
							},
						}
					}
				}
			}

			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
