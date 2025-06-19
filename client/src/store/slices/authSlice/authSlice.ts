import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../../../types/auth.types'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isAuthenticated: boolean
	isLoading: boolean
}

const initialState: IAuthState = {
	user: null,
	accessToken: null,
	isAuthenticated: false,
	isLoading: true,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{ access_token: string; user: IUser }>
		) => {
			state.accessToken = action.payload.access_token
			state.user = action.payload.user
			state.isAuthenticated = true
			state.isLoading = false
		},
		logout: (state) => {
			state.accessToken = null
			state.user = null
			state.isAuthenticated = false
			state.isLoading = false
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
			state.isAuthenticated = true
			state.isLoading = false
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuthenticated = true
			state.isLoading = false
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
	},
})

export const { logout, setCredentials, setAccessToken, setUser, setLoading } =
	authSlice.actions

export default authSlice.reducer
