import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../../../types/auth.types'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isAuthenticated: boolean
}

const initialState: IAuthState = {
	user: null,
	accessToken: null,
	isAuthenticated: false,
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
		},
		logout: (state) => {
			state.accessToken = null
			state.user = null
			state.isAuthenticated = false
		},
	},
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
