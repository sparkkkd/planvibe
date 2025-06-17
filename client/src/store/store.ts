import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './slices/authApi/authApi'
import authSlice from './slices/authSlice/authSlice'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	authSlice,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
