import type { NavigateFunction } from 'react-router-dom'

let navigate: NavigateFunction

export const setNavigator = (nav: NavigateFunction) => {
	navigate = nav
}

export const navigateTo = (path: string) => {
	if (!navigate) throw new Error('Navigate function is not set')
	navigate(path)
}

let redirectPathAfterLogin: string = '/projects'

export const setRedirectPathAfterLogin = (path: string) => {
	redirectPathAfterLogin = path
}

export const getRedirectPathAfterLogin = () => redirectPathAfterLogin
