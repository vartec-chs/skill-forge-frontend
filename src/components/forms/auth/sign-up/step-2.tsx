import { useSignUpFormState } from '@/states/useSignUpForm.state'

import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, FieldValues, useForm } from 'react-hook-form'

import dayjs from 'dayjs'

import { signUpStep2Schema, SignUpStep2Type } from '@/zod-schemas/sign-up.schema'

export const SignUpStep2 = () => {
	const { updateFormData, nextStep, formData, prevStep } = useSignUpFormState()
	const {
		handleSubmit,
		control,
		register,
		formState: { isValid, errors },
	} = useForm<SignUpStep2Type>({
		resolver: zodResolver(signUpStep2Schema),
		mode: 'onChange',
		defaultValues: {
			dateOfBirth: formData.dateOfBirth,
			gender: formData.gender,
		},
	})

	const onSubmit = (data: FieldValues) => {
		console.log(data)
		updateFormData(data)
		nextStep()
	}

	return (
		<Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2} direction='column' alignItems='center' justifyContent='center'>
				<Controller
					name='dateOfBirth'
					control={control}
					render={({ field: { onChange, value, ...restField } }) => (
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								sx={{ width: '100%' }}
								label='Дата рождения'
								format='DD.MM.YYYY'
								views={['year', 'month', 'day']}
								autoFocus
								defaultValue={dayjs('01.01.2000')}
								maxDate={dayjs()
									.year(dayjs().year() - 14)
									.startOf('year')}
								minDate={dayjs()
									.year(dayjs().year() - 25)
									.startOf('year')}
								slotProps={{
									textField: {
										inputProps: {
											'aria-required': true,
											'aria-label': 'Дата рождения',
										},
									},
								}}
								onChange={(event) => {
									onChange(event?.toDate())
								}}
								value={dayjs(value)}
								{...restField}
							/>
						</LocalizationProvider>
					)}
				/>

				<Controller
					name='gender'
					control={control}
					render={({ field: { onChange, value, ...restField } }) => (
						<TextField
							required
							fullWidth
							id='select'
							label='Пол'
							select
							{...restField}
							error={!!errors.gender}
							helperText={errors.gender?.message}
							{...register('gender', {
								required: 'Пол обязательно для заполнения',
							})}
							defaultValue={''}
							value={value}
							onChange={(event) => {
								onChange(event.target.value)
							}}
						>
							<MenuItem value='Male'>Мужской</MenuItem>
							<MenuItem value='Female'>Женский</MenuItem>
						</TextField>
					)}
				/>

				<Stack width={'100%'} direction='row' spacing={2} justifyContent='center'>
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
