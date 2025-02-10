import { PATHS } from '@/configs/paths'
import { useRequestResetPassword } from '@/hooks/auth/useRequestResetPassword'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from 'react-router'

import { forwardRef, useState } from 'react'

import {
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'

import toast from 'react-hot-toast'

import { IMaskInput } from 'react-imask'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import { signInSchema, TSignInSchema } from '@zod-schemas/sign-in.schema'

import { useSignIn } from '@hooks/auth/useSignIn'

const TextMaskCustom = forwardRef<HTMLInputElement, any>(({ onChange, value, ...props }, ref) => (
	<IMaskInput
		{...props}
		mask='+7 (000) 000-00-00'
		definitions={{ '#': /[0-9]/ }}
		value={value}
		onAccept={(val) => onChange(val)}
		inputRef={ref}
	/>
))

export const SignInForm = () => {
	const [isTwoFactor, setIsTwoFactor] = useState(false)
	const navigate = useNavigate()
	const requestResetPassword = useRequestResetPassword({
		onSuccess: (data) => toast.success(data.message, { duration: 5000 }),
		onError: (message: string) => toast.error(message, { duration: 5000 }),
	})
	const { signInWithEmail, signInWithPhone, isLoading } = useSignIn({
		onSuccess: (data) => {
			if (data.statusCode === 1100) {
				setIsTwoFactor(true)
				console.log(`data:`, data)
				return
			}
			toast.success(data.message, { duration: 5000 })
			navigate(`/${PATHS.DASHBOARD.ROOT}`, { replace: true })
		},
		onError: (message: string) => toast.error(message, { duration: 5000 }),
	})

	const {
		handleSubmit,
		control,
		watch,
		clearErrors,
		setError,
		formState: { isValid, errors, isDirty },
	} = useForm<TSignInSchema>({
		resolver: zodResolver(signInSchema),
		mode: 'all',
	})

	const loginValue = watch('login', '')
	const isPhone = /^\d+$/.test(loginValue.replace(/\D/g, ''))
	const isTwoFactorEnabled = isTwoFactor ? watch('twoFactorMailAuthCode', '')?.length !== 6 : false

	const onSubmit = async (data: FieldValues) => {
		console.log(data)
		if (isPhone) {
			await signInWithPhone({
				phone: data.login,
				password: data.password,
				twoFactorMailAuthCode: data.twoFactorMailAuthCode,
			})
		} else {
			await signInWithEmail({
				email: data.login,
				password: data.password,
				twoFactorMailAuthCode: data.twoFactorMailAuthCode,
			})
		}
	}

	const onClickForgotPassword = async () => {
		clearErrors('login')
		if (isPhone || loginValue === '')
			return setError('login', { message: 'Введите почту для восстановления пароля' })

		await requestResetPassword.requestResetPassword({ email: loginValue })
	}

	return (
		<Paper
			sx={{
				p: 2,
				m: 2,
				maxWidth: 400,
				width: '100%',
				height: '100%',
				borderRadius: 4,
			}}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				{!isTwoFactor ? (
					<>
						<Controller
							name='login'
							control={control}
							render={({ field }) =>
								isPhone ? (
									<TextField
										{...field}
										label='Телефон'
										variant='outlined'
										fullWidth
										disabled={isLoading}
										autoFocus
										type='tel'
										error={!!errors.login}
										helperText={errors.login?.message}
										slotProps={{
											input: {
												inputComponent: TextMaskCustom as any, // Используем маску
											},
										}}
									/>
								) : (
									<TextField
										{...field}
										label='Почта'
										variant='outlined'
										type='email'
										autoFocus
										disabled={isLoading || requestResetPassword.isLoading}
										fullWidth
										error={!!errors.login}
										helperText={errors.login?.message}
									/>
								)
							}
						/>

						<Controller
							name='password'
							control={control}
							render={({ field }) => (
								<FormControl fullWidth variant='outlined'>
									<TextField
										disabled={isLoading}
										{...field}
										id='password'
										label='Пароль'
										type='password'
										error={!!errors.password}
										helperText={errors.password?.message}
									/>
								</FormControl>
							)}
						/>
					</>
				) : (
					<Controller
						name='twoFactorMailAuthCode'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1'>На вашу почту отправлен код</Typography>
								<MuiOtpInput
									TextFieldsProps={{ placeholder: '*' }}
									autoFocus
									id='twoFactorMailAuthCode'
									length={6}
									{...field}
								/>
							</>
						)}
					/>
				)}

				<Button
					size='large'
					fullWidth
					disabled={
						!isDirty ||
						!isValid ||
						isLoading ||
						isTwoFactorEnabled ||
						requestResetPassword.isLoading
					}
					type='submit'
					variant='contained'
				>
					{isLoading || requestResetPassword.isLoading ? <CircularProgress size={24} /> : 'Войти'}
				</Button>

				{!isTwoFactor && (
					<Button
						variant='text'
						color='inherit'
						size='large'
						disabled={isLoading || requestResetPassword.isLoading}
						onClick={onClickForgotPassword}
						fullWidth
					>
						{isLoading || requestResetPassword.isLoading ? (
							<CircularProgress size={24} />
						) : (
							'Сбросить пароль'
						)}
					</Button>
				)}
			</Stack>
		</Paper>
	)
}
