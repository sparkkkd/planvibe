import type { z } from 'zod'
import type { loginSchema, registerSchema } from './authSchema'

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export type AuthMode = 'login' | 'register'
