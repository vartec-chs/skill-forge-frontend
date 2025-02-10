import * as z from 'zod'

const phoneRegex = /^(\+7)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Схема валидации Zod
export const signInSchema = z.object({
	login: z
		.string({ message: 'Поле обязательно' })
		.refine((value) => phoneRegex.test(value) || emailRegex.test(value), {
			message: 'Введите корректный номер телефона или email',
		}),
	password: z.string({ message: 'Поле обязательно' }).min(8, 'Пароль должен быть длиннее 8 символов'),
	twoFactorMailAuthCode: z.string().optional(),
})

export type TSignInSchema = z.infer<typeof signInSchema>
