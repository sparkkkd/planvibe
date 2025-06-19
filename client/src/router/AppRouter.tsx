import type React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage/AuthPage'
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage'
import { useAppSelector } from '../store/hooks'
import { PrivateRoute } from './PrivateRoute'
import { IntroPage } from '../pages/IntroPage/IntroPage'
import { Loader } from '../components/Loader/Loader'

export const AppRouter: React.FC = () => {
	const { isAuthenticated, isLoading } = useAppSelector(
		(state) => state.authSlice
	)

	if (isLoading) {
		return (
			<div
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Loader />
			</div>
		)
	}

	return (
		<Routes>
			{/* Public */}
			<Route path='/auth' element={<AuthPage />} />
			<Route path='/' element={<IntroPage />} />

			{/* Private */}
			<Route
				element={
					<PrivateRoute isAuthenticated={isAuthenticated} redirectPath='/' />
				}
			>
				<Route path='/projects' element={<ProjectsPage />} />
			</Route>

			{/* Redirect */}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}
