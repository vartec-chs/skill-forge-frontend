import { forwardRef, useState } from 'react'

import { Box, Button, Stack, TextField } from '@mui/material'

import { IMaskInput } from 'react-imask'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import { signUpStep3Schema, SignUpStep3Type } from '@/zod-schemas/sign-up.schema'

import { useSignUpFormState } from '@states/useSignUpForm.state'

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void
	name: string
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props
		return (
			<IMaskInput
				{...other}
				mask='+7 (#00) 000-00-00'
				definitions={{
					'#': /[1-9]/,
				}}
				inputRef={ref}
				onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
				overwrite
			/>
		)
	},
)

export const SignUpStep3 = () => {
	const { updateFormData, nextStep, formData, prevStep } = useSignUpFormState()
	const {
		handleSubmit,
		control,

		setValue,

		formState: { isValid, errors },
	} = useForm<SignUpStep3Type>({
		resolver: zodResolver(signUpStep3Schema),
		mode: 'all',
		defaultValues: {
			phone: formData.phone,
		},
	})

	const onSubmit = (data: FieldValues) => {
		console.log(data)
		updateFormData(data)
		nextStep()
	}

	const [values, setValues] = useState({
		textmask: '+7 (900) 000-00-00',
		numberformat: '+79000000000', // russian
	})

	return (
		<Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				<Controller
					name='phone'
					control={control}
					render={({ field: { onChange, onBlur, value, ...restField } }) => (
						<TextField
							fullWidth
							autoFocus
							label='Телефон'
							required
							onBlur={onBlur}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setValues({
									...values,
									[e.target.name]: e.target.value,
								})
								setValue('phone', e.target.value)
								onChange(e.target.value)
							}}
							value={value}
							error={!!errors.phone}
							helperText={errors.phone?.message}
							{...restField}
							InputProps={{
								inputComponent: TextMaskCustom as any,
							}}
						/>
					)}
				/>

				<Stack width='100%' direction='row' spacing={2} justifyContent='center'>
					<Button size='large' onClick={prevStep}>
						Назад
					</Button>
					<Button size='large' fullWidth type='submit' variant='contained' disabled={!isValid}>
						Продолжить
					</Button>
				</Stack>
			</Stack>
		</Box>
	)
}
