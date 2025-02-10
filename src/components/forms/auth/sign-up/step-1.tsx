import { useSignUpFormState } from '@/states/useSignUpForm.state'

import { Box, Button, Stack, TextField } from '@mui/material'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import { signUpStep1Schema, SignUpStep1Type } from '@/zod-schemas/sign-up.schema'

export const SignUpStep1 = () => {
	const { updateFormData, nextStep, formData } = useSignUpFormState()
	const {
		handleSubmit,

		control,
		formState: { isValid, errors },
	} = useForm<SignUpStep1Type>({
		resolver: zodResolver(signUpStep1Schema),
		mode: 'onChange',
		defaultValues: {
			firstName: formData.firstName,
			lastName: formData.lastName,
			surname: formData.surname,
		},
	})

	const onSubmit = (data: FieldValues) => {
		updateFormData(data)
		nextStep()
	}

	return (
		<Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				<Controller
					name='lastName'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							{...field}
							autoFocus
							required
							label='Фамилия'
							helperText={errors.lastName?.message}
						/>
					)}
				/>

				<Controller
					name='firstName'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Имя'
							required
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
							fullWidth
						/>
					)}
				/>

				<Controller
					name='surname'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Отчество'
							helperText={errors.surname?.message || 'Если отсутствует, оставьте пустым'}
							fullWidth
						/>
					)}
				/>

				<Button size='large' fullWidth type='submit' variant='contained' disabled={!isValid}>
					Продолжить
				</Button>
			</Stack>
		</Box>
	)
}
