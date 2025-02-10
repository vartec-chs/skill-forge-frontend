import { PATHS } from '@/configs/paths'
import { TSuccess } from '@/ts/global.types'
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

import { signUpStep4Schema, SignUpStep4Type } from '@zod-schemas/sign-up.schema'

import { useSignUp } from '@hooks/auth/useSignUp'

import { useSignUpFormState } from '@states/useSignUpForm.state'

export const SignUpStep4 = () => {
	const navigate = useNavigate()
	const { updateFormData, formData, prevStep, resetFormData } = useSignUpFormState()
	const { isLoading, signUp } = useSignUp<TSuccess>({
		onSuccess: (data) => {
			toast.success(data.message, { duration: 5000 })
			resetFormData()
			navigate(`/${PATHS.AUTH.SIGN_IN}`, {
				replace: true,
			})
		},
		onError: (message) => {
			toast.error(message, { duration: 5000 })
		},
	})
	const [isShowPassword, setIsShowPassword] = useState(false)

	const {
		handleSubmit,
		control,
		formState: { isValid, errors, isDirty },
	} = useForm<SignUpStep4Type>({
		resolver: zodResolver(signUpStep4Schema),
		mode: 'all',
		defaultValues: {
			email: formData.email,
			password: formData.password,
			confirmPassword: formData.confirmPassword,
		},
	})

	const onSubmit = async (data: FieldValues) => {
		updateFormData(data)
		const signUpData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			surname: formData.surname,
			dateOfBirth: formData.dateOfBirth,
			gender: formData.gender,
			email: formData.email || data.email,
			password: formData.password || data.password,
			phone: formData.phone,
		}

		await signUp(signUpData)
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
		<Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							autoFocus
							required
							disabled={isLoading}
							label='Почта'
							type='email'
							error={!!errors.email}
							helperText={errors.email?.message}
							fullWidth
						/>
					)}
				/>

				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							required
							disabled={isLoading}
							label='Пароль'
							type={isShowPassword ? 'text' : 'password'}
							error={!!errors.password}
							helperText={errors.password?.message}
							fullWidth
							slotProps={{
								input: {
									endAdornment: inputAdornment,
								},
							}}
						/>
					)}
				/>

				<Controller
					name='confirmPassword'
					control={control}
					render={({ field }) => (
						<TextField
							disabled={isLoading}
							{...field}
							required
							label='Подтвердите пароль'
							type={isShowPassword ? 'text' : 'password'}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message}
							fullWidth
							slotProps={{
								input: {
									endAdornment: inputAdornment,
								},
							}}
						/>
					)}
				/>

				<Stack width={'100%'} direction='row' spacing={2} justifyContent='center'>
					<Button size='large' disabled={isLoading} onClick={prevStep}>
						{isLoading ? <CircularProgress size={24} /> : 'Назад'}
					</Button>
					<Button
						size='large'
						fullWidth
						type='submit'
						variant='contained'
						disabled={!isValid || !isDirty || isLoading}
					>
						{isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
					</Button>
				</Stack>
			</Stack>
		</Box>
	)
}
