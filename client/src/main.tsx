import { createRoot } from 'react-dom/client'
import './index.sass'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store, type RootState } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { createAxiosInstance } from './api/axiosInstance.ts'

createAxiosInstance(() => {
	const state = store.getState() as RootState
	return state.authSlice.accessToken
})

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
