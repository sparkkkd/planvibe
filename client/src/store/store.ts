import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './slices/authApi/authApi'
import authSlice from './slices/authSlice/authSlice'
import { projectsApi } from './slices/projectsApi/projectsApi'
import { authRedirectMiddleware } from './middlewares/authRedirectMiddleware'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	authSlice,
	[projectsApi.reducerPath]: projectsApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			authRedirectMiddleware,
			projectsApi.middleware
		),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
