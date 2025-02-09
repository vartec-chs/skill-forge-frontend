import { PATHS } from '@/configs/paths'
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
} from '@mui/material'

import toast from 'react-hot-toast'

import { IMaskInput } from 'react-imask'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import { signInSchema, TSignInSchema } from '@zod-schemas/sign-in.schema'

import { useSignIn } from '@hooks/auth/useSignIn'

import { TSuccess } from '@ts/global.types'

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
	const [twoFactorCode, setTwoFactorCode] = useState('')
	const navigate = useNavigate()
	const { signInWithEmail, signInWithPhone, isLoading } = useSignIn<TSuccess>({
		onSuccess: (data) => {
			if (data.statusCode === 1100) {
				setIsTwoFactor(true)
				return
			}
			toast.success(data.message, { duration: 5000 })
			navigate(`/${PATHS.DASHBOARD.ROOT}`, { replace: true })
		},
		onError: (message: string) => {
			toast.error(message, { duration: 5000 })
		},
	})
	const {
		handleSubmit,
		control,
		watch,
		formState: { isValid, errors, isDirty },
	} = useForm<TSignInSchema>({
		resolver: zodResolver(signInSchema),
		mode: 'all',
	})

	const loginValue = watch('login', '')
	const isPhone = /^\d+$/.test(loginValue.replace(/\D/g, ''))
	const isTwoFactorEnabled = isTwoFactor ? watch('twoFactorMailAuthCode', '')?.length !== 6 : false

	const onSubmit = async (data: FieldValues) => {
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
				{isTwoFactor ? (
					<Controller
						name='twoFactorMailAuthCode'
						control={control}
						render={({ field }) => (
							<>
								<InputLabel sx={{ textAlign: 'left' }} htmlFor='twoFactorMailAuthCode'>
									Код из письма
								</InputLabel>
								<MuiOtpInput id='twoFactorMailAuthCode' length={6} {...field} />
							</>
						)}
					/>
				) : (
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
										disabled={isLoading}
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
									/>
									{errors.password && (
										<FormHelperText error>{errors.password.message}</FormHelperText>
									)}
								</FormControl>
							)}
						/>
					</>
				)}

				<Button
					size='large'
					fullWidth
					disabled={!isDirty || !isValid || isLoading || isTwoFactorEnabled}
					type='submit'
					variant='contained'
				>
					{isLoading ? <CircularProgress size={24} /> : 'Войти'}
				</Button>
			</Stack>
		</Paper>
	)
}
