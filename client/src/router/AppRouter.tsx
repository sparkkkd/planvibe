import type React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage/AuthPage'
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage'

export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path='/auth' element={<AuthPage />} />
			<Route path='/projects' element={<ProjectsPage />} />
			<Route path='*' element={<Navigate to='/auth' />} />
		</Routes>
	)
}
