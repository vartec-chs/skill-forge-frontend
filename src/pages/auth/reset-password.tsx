import { ResetPasswordForm } from '@/components/forms/auth/reset-password.form'
import { Navigate } from 'react-router'

import type { FC } from 'react'

import { Paper, Stack, Typography } from '@mui/material'

import { PATHS } from '@configs/paths'

export const ResetPasswordPage: FC = () => {
	const urlParams = new URLSearchParams(window.location.search)
	const token = urlParams.get('token') as string
	const email = urlParams.get('email') as string

	if (!token || !email) {
		return <Navigate to={`/${PATHS.AUTH.SIGN_IN}`} />
	}

	return (
		<Stack spacing={2} sx={{ width: '100%' }} alignItems='center' justifyContent='center'>
			<Typography variant='h5' fontWeight='bold'>
				Сброс пароля
			</Typography>
			<Paper
				sx={{
					p: 2,
					m: 2,
					maxWidth: 400,
					width: '100%',
					height: '100%',
					borderRadius: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<ResetPasswordForm token={token} email={email} />
			</Paper>
		</Stack>
	)
}
