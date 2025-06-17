import type { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteProps {
	isAuthenticated: boolean
	redirectPath?: string
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
	isAuthenticated,
	redirectPath = '/login',
}) => {
	if (!isAuthenticated) return <Navigate to={redirectPath} replace />

	return <Outlet />
}
