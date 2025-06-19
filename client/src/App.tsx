import { useNavigate } from 'react-router-dom'
import { UseAuthInit } from './hooks/useAuthInit'
import { AppRouter } from './router/AppRouter'
import { useEffect } from 'react'
import { setNavigator } from './utils/navigation'

function App() {
	UseAuthInit()

	const navigate = useNavigate()

	useEffect(() => {
		setNavigator(navigate)
	}, [navigate])

	return <AppRouter />
}

export default App
