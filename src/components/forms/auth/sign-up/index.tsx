import { useSignUpFormState } from '@/states/useSignUpForm.state'

import { FC } from 'react'

import { Box, Paper, Step, StepLabel, Stepper } from '@mui/material'

import { SignUpStep1 } from './step-1'
import { SignUpStep2 } from './step-2'
import { SignUpStep3 } from './step-3'
import { SignUpStep4 } from './step-4'

export const SignUpForm: FC = () => {
	const stepsTitle = ['ФИО', 'Допольнительная информация', 'Номер телефона', 'Данные для входа']
	const { step } = useSignUpFormState()
	return (
		<Paper
			sx={{
				p: 2,
				m: 2,
				maxWidth: 400,
				width: '100%',
				borderRadius: 4,
				boxShadow: 4,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Box
				component={'div'}
				sx={{
					overflow: 'auto',
					'&::-webkit-scrollbar': { scrollbarWidth: 'thin' },
					'&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,.1)', borderRadius: 4 },
					'&::-webkit-scrollbar-track': { backgroundColor: 'rgba(0,0,0,.1)', borderRadius: 4 },
					"&::-webkit-scrollbar:horizontal": { height: 4 },
					"&::-webkit-scrollbar:vertical": { width: 4 },

					
				}}
			>
				<Stepper alternativeLabel sx={{ width: '550px' }} activeStep={step}>
					{stepsTitle.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			</Box>
			{[<SignUpStep1 />, <SignUpStep2 />, <SignUpStep3 />, <SignUpStep4/>][step]}
		</Paper>
	)
}
