import { useEffect, type FC } from 'react'
import clsx from 'clsx'

import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, registerSchema } from './authSchema'

import type { AuthMode, LoginFormData, RegisterFormData } from './authTypes'

import { Button } from '../../components/Button/Button'
import { FormField } from '../../components/FormField/FormField'

import styles from './AuthForm.module.sass'

interface AuthFormProps {
	className?: string
	mode: AuthMode
	onSubmit: (data: LoginFormData | RegisterFormData) => void
	switchMode: () => void
	isLoading?: boolean
}

export const AuthForm: FC<AuthFormProps> = ({
	className,
	mode,
	onSubmit,
	switchMode,
	isLoading,
}) => {
	const isLogin = mode === 'login'

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<LoginFormData | RegisterFormData>({
		resolver: zodResolver(isLogin ? loginSchema : registerSchema),
		mode: 'onChange',
	})

	const typedErrors = errors as FieldErrors<RegisterFormData & LoginFormData>

	useEffect(() => {
		reset()
	}, [mode])

	return (
		<form
			className={clsx(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className={styles.title}>{isLogin ? 'Войти' : 'Регистрация'}</h2>

			<FormField
				name='email'
				type='email'
				placeholder='Эл. почта'
				register={register}
				error={typedErrors.email?.message}
				inputClassName={styles.input}
			/>

			{!isLogin && (
				<FormField
					name='name'
					type='text'
					placeholder='Имя'
					register={register}
					error={typedErrors.name?.message}
					inputClassName={styles.input}
				/>
			)}

			<FormField
				name='password'
				type='password'
				placeholder='Пароль'
				register={register}
				error={typedErrors.password?.message}
				inputClassName={styles.input}
			/>

			{!isLogin && (
				<FormField
					name='confirmPassword'
					type='password'
					placeholder='Подтвердите пароль'
					register={register}
					error={typedErrors.confirmPassword?.message}
					inputClassName={styles.input}
				/>
			)}

			<Button
				isLoading={isLoading}
				disabled={!isValid}
				type='submit'
				className={styles.submit}
			>
				{isLogin ? 'Войти' : 'Зарегистрироваться'}
			</Button>

			<div className={styles.switch}>
				<span>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</span>
				<button
					type='button'
					onClick={switchMode}
					className={styles.switchLink}
				>
					{isLogin ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</div>
		</form>
	)
}
