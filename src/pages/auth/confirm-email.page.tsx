import { Navigate, useNavigate } from 'react-router'

import type { FC } from 'react'

import { Button, CircularProgress, Paper, Stack, Typography } from '@mui/material'

import toast from 'react-hot-toast'

import { useConfirmEmail } from '@hooks/auth/useConfirmEmail'

import { PATHS } from '@configs/paths'

export const ConfirmEmailPage: FC = () => {
	const navigate = useNavigate()
	const { isLoading, confirmEmail } = useConfirmEmail({
		onSuccess: () => {
			navigate(`/${PATHS.AUTH.SIGN_IN}`)
			toast.success('Почта подтверждена', { duration: 5000 })
		},
		onError: (message) => {
			toast.error(message, { duration: 5000 })
		},
	})
	const urlParams = new URLSearchParams(window.location.search)
	const token = urlParams.get('token') as string
	const email = urlParams.get('email') as string

	if (!token || !email) {
		return <Navigate to={`/${PATHS.AUTH.SIGN_IN}`} />
	}

	const confirm = async () => {
		await confirmEmail({ token, email })
	}

	return (
		<Stack spacing={2} sx={{ width: '100%' }} alignItems='center' justifyContent='center'>
			<Typography variant='h5' fontWeight='bold'>
				Подтверждение электронной почты
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
				<Typography variant='h6'>{email} </Typography>
				<Button onClick={confirm} fullWidth variant='contained' type='submit'>
					{isLoading ? <CircularProgress size={24} /> : 'Подтвердить'}
				</Button>
			</Paper>
		</Stack>
	)
}
