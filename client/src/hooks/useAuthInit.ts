import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import {
	useLazyFetchMeQuery,
	useRefreshMutation,
} from '../store/slices/authApi/authApi'
import {
	setAccessToken,
	setLoading,
	setUser,
} from '../store/slices/authSlice/authSlice'

export const UseAuthInit = () => {
	const dispatch = useAppDispatch()
	const [fetchMe, { data, isSuccess }] = useLazyFetchMeQuery()
	const [refresh] = useRefreshMutation()

	useEffect(() => {
		const init = async () => {
			try {
				const res = await refresh().unwrap()
				dispatch(setAccessToken(res.access_token))

				const userData = await fetchMe().unwrap()
				dispatch(setUser(userData))
			} catch (error) {
				console.error('Auto login failed:', error)
			} finally {
				dispatch(setLoading(false))
			}
		}

		init()
	}, [])

	useEffect(() => {
		if (isSuccess && data) dispatch(setUser(data))
	}, [isSuccess, data, dispatch])
}
