import * as z from 'zod'

export const signUpStep1Schema = z.object({
	firstName: z
		.string({ message: 'Это поле не может быть пустым' })
		.min(2, { message: 'Это поле должно быть длиннее 2 символов' }),
	lastName: z
		.string({ message: 'Это поле не может быть пустым' })
		.min(2, { message: 'Это поле должно быть длиннее 2 символов' }),
	surname: z.string().optional(),
})

export const signUpStep2Schema = z.object({
	dateOfBirth: z.date({ message: 'Это поле не может быть пустым' }),
	gender: z.enum(['Male', 'Female'], { message: 'Это поле не может быть пустым' }),
})

export const signUpStep3Schema = z.object({
	phone: z
		.string({ message: 'Это поле не может быть пустым' })
		.regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректный номер телефона'),
})

export const signUpStep4Schema = z
	.object({
		email: z
			.string({ message: 'Это поле не может быть пустым' })
			.email({ message: 'Некорректный email' }),

		password: z
			.string({ message: 'Это поле не может быть пустым' })
			.min(8, { message: 'Это поле должно быть длиннее 8 символов' }),
		confirmPassword: z
			.string({ message: 'Это поле не может быть пустым' })
			.min(8, { message: 'Это поле должно быть длиннее 8 символов' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type SignUpStep1Type = z.infer<typeof signUpStep1Schema>
export type SignUpStep2Type = z.infer<typeof signUpStep2Schema>
export type SignUpStep3Type = z.infer<typeof signUpStep3Schema>
export type SignUpStep4Type = z.infer<typeof signUpStep4Schema>
