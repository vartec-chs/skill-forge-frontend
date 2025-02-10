import * as z from 'zod'

export const resetPasswordSchema = z
	.object({
		token: z.string({ message: 'Это поле не может быть пустым' }),
		email: z
			.string({ message: 'Это поле не может быть пустым' })
			.email({ message: 'Некорректный email' }),
		newPassword: z
			.string({ message: 'Это поле не может быть пустым' })
			.min(8, { message: 'Это поле должно быть длиннее 8 символов' }),
		confirmNewPassword: z
			.string({ message: 'Это поле не может быть пустым' })
			.min(8, { message: 'Это поле должно быть длиннее 8 символов' }),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmNewPassword'],
	})

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
