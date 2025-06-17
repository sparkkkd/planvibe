import { useState, type FC } from 'react'
import clsx from 'clsx'

import { useAppDispatch } from '../../store/hooks'
import {
	useLoginMutation,
	useRegisterMutation,
} from '../../store/slices/authApi/authApi'
import { getAxiosInstance } from '../../api/axiosInstance'
import { setCredentials } from '../../store/slices/authSlice/authSlice'
import { useNavigate } from 'react-router-dom'

import type {
	AuthMode,
	LoginFormData,
	RegisterFormData,
} from '../../modules/AuthForm/authTypes'

import { Card } from '../../components/Card/Card'
import { Logo } from '../../components/Logo/Logo'
import { AuthForm } from '../../modules/AuthForm/AuthForm'

import styles from './AuthPage.module.sass'
import { AnimatePresence, motion, type Variants } from 'framer-motion'

interface AuthPageProps {
	className?: string
}

export const AuthPage: FC<AuthPageProps> = ({ className }) => {
	const [mode, setMode] = useState<AuthMode>('login')

	const dispatch = useAppDispatch()

	const [login, { isLoading: isLoginLoading, error: loginError }] =
		useLoginMutation()
	const [register, { isLoading: isRegisterLoading, error: registerError }] =
		useRegisterMutation()

	const navigate = useNavigate()

	const axios = getAxiosInstance()

	const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
		if (mode === 'login') {
			const loginData = data as LoginFormData
			try {
				const loginResponse = await login(loginData).unwrap()

				const userResponse = await axios.get('/auth/@me', {
					headers: { Authorization: `Bearer ${loginResponse.access_token}` },
				})

				if (!userResponse) throw new Error('Что-то пошло не так...')

				const user = userResponse.data

				dispatch(
					setCredentials({
						access_token: loginResponse.access_token,
						user,
					})
				)

				navigate('/')
			} catch (error) {
				console.error('Login error:', {
					catchError: error,
					queryError: loginError,
				})
			}
		} else {
			const { confirmPassword, ...registerData } = data as RegisterFormData

			try {
				const registerResponse = await register(registerData).unwrap()

				const userResponse = await axios.get('/auth/@me', {
					headers: { Authorization: `Bearer ${registerResponse.access_token}` },
				})

				if (!userResponse) throw new Error('Что-то пошло не так...')

				const user = userResponse.data

				dispatch(
					setCredentials({
						access_token: registerResponse.access_token,
						user,
					})
				)

				navigate('/projects')
			} catch (error) {
				console.error('Login error:', {
					catchError: error,
					queryError: registerError,
				})
			}
		}
	}

	const switchMode = () => {
		setMode((prev) => (prev === 'login' ? 'register' : 'login'))
	}

	const containerVariants: Variants = {
		initial: {
			opacity: 0,
			scale: 0.3,
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.25,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.7,
			transition: {
				duration: 0.25,
			},
		},
	}

	return (
		<div className={clsx(styles.wrapper, className)}>
			<AnimatePresence mode='wait'>
				<motion.div
					key={mode}
					variants={containerVariants}
					initial='initial'
					animate='animate'
					exit='exit'
				>
					<Card className={styles.card}>
						<Logo className={styles.logo} />
						<AuthForm
							mode={mode}
							onSubmit={handleSubmit}
							switchMode={switchMode}
							isLoading={mode === 'login' ? isLoginLoading : isRegisterLoading}
						/>
					</Card>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
