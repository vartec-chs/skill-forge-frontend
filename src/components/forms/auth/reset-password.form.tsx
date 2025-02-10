import { PATHS } from '@/configs/paths'
import { useResetPassword } from '@/hooks/auth/useResetPassword'
import { useNavigate } from 'react-router'

import { useState } from 'react'

import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from '@mui/material'

import { Eye, EyeOff } from 'lucide-react'

import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import { resetPasswordSchema, TResetPasswordSchema } from '@/zod-schemas/reset-password.schema'

interface ResetPasswordFormProps {
	token: string
	email: string
}

export const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
	const [isShowPassword, setIsShowPassword] = useState(false)
	const navigate = useNavigate()
	const { isLoading, resetPassword } = useResetPassword({
		onSuccess: (data) => {
			toast.success(data.message, { duration: 5000 })
			navigate(`/${PATHS.AUTH.SIGN_IN}`, { replace: true })
		},
		onError: (message) => {
			if (typeof message === 'string') toast.error(message, { duration: 5000 })
			else {
				if (message.statusCode === 404) {
					toast.error(message.message, { duration: 5000 })
					navigate(`/${PATHS.AUTH.SIGN_IN}`, { replace: true })
				} else {
					toast.error(message.message, { duration: 5000 })
				}
			}
		},
	})

	const {
		handleSubmit,
		control,
		formState: { isDirty, isValid, errors },
	} = useForm<TResetPasswordSchema>({
		mode: 'onChange',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token,
			email,
		},
	})

	const onSubmit = async (data: FieldValues) => {
		await resetPassword({
			token,
			email,
			newPassword: data.newPassword,
		})
	}

	const inputAdornment = (
		<InputAdornment position='end'>
			<IconButton
				aria-label='toggle password visibility'
				onClick={() => setIsShowPassword(!isShowPassword)}
				edge='end'
			>
				{isShowPassword ? <Eye /> : <EyeOff />}
			</IconButton>
		</InputAdornment>
	)

	return (
		<Box sx={{ width: '100%' }} component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				<Controller
					name='newPassword'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							{...field}
							autoFocus
							required
							label='Новый пароль'
							type={isShowPassword ? 'text' : 'password'}
							error={!!errors.newPassword}
							helperText={errors.newPassword?.message}
							slotProps={{
								input: {
									endAdornment: inputAdornment,
								},
							}}
						/>
					)}
				/>

				<Controller
					name='confirmNewPassword'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Подтвердите новый пароль'
							required
							type={isShowPassword ? 'text' : 'password'}
							error={!!errors.confirmNewPassword}
							helperText={errors.confirmNewPassword?.message}
							fullWidth
							slotProps={{
								input: {
									endAdornment: inputAdornment,
								},
							}}
						/>
					)}
				/>

				<Button
					size='large'
					fullWidth
					type='submit'
					variant='contained'
					disabled={!isValid || !isDirty || isLoading}
				>
					{isLoading ? <CircularProgress size={24} /> : 'Сохранить'}
				</Button>
			</Stack>
		</Box>
	)
}
