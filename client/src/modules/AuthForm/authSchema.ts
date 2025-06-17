import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().min(1, 'Введите email').email('Неверный email'),
	password: z
		.string()
		.min(6, 'Минимум 6 символов')
		.max(40, 'Максимум 40 символов'),
})

export const registerSchema = loginSchema
	.extend({
		confirmPassword: z.string().min(6, 'Минимум 6 символов'),
		name: z
			.string()
			.min(5, 'Минимум 5 символов')
			.max(40, 'Максимум 40 символов'),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})
