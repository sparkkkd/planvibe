import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../store'
import type {
	ILoginRequest,
	IAuthResponse,
	IRegisterRequest,
	IUser,
} from '../../../types/auth.types'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000',
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState
			const token = state.authSlice.accessToken

			if (token) headers.set('Authorization', `Bearer ${token}`)

			return headers
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<IAuthResponse, ILoginRequest>({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),

		register: builder.mutation<IAuthResponse, IRegisterRequest>({
			query: (credentials) => ({
				url: '/auth/register',
				method: 'POST',
				body: credentials,
			}),
		}),

		refresh: builder.mutation<IAuthResponse, void>({
			query: () => ({
				url: '/auth/refresh',
				method: 'POST',
			}),
		}),

		fetchMe: builder.query<IUser, void>({
			query: () => ({
				url: '/auth/@me',
				method: 'GET',
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useFetchMeQuery,
	useLogoutMutation,
	useRegisterMutation,
	useLazyFetchMeQuery,
	useRefreshMutation,
} = authApi
