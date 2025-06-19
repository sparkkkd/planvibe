import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import { navigateTo, setRedirectPathAfterLogin } from '../../utils/navigation'
import { logout } from '../slices/authSlice/authSlice'

interface IRejectedAction {
	payload?: {
		status?: number | 'FETCH_ERROR'
		data?: unknown
	}
	error?: {
		status?: number | 'FETCH_ERROR'
		data?: unknown
	}
}

export const authRedirectMiddleware: Middleware =
	(store) => (next) => (action) => {
		try {
			if (isRejectedWithValue(action)) {
				const rejectedAction = action as IRejectedAction
				const errorStatus =
					rejectedAction.payload?.status || rejectedAction.error?.status

				if (errorStatus === 401) {
					const currentPath = window.location.pathname + window.location.search

					if (!currentPath.startsWith('/auth')) {
						setRedirectPathAfterLogin(currentPath)
					}

					store.dispatch(logout())
					navigateTo('/auth')
				}
			}
		} catch (error) {
			console.error('Error in authRedirectMiddleware:', error)
		}

		return next(action)
	}
