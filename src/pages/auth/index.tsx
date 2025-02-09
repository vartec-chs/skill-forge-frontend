import { useLocation, useNavigate } from 'react-router'

import { FC } from 'react'

import { Stack } from '@mui/material'

import { SignInForm } from '@components/forms/auth/sign-in.form'
import { SignUpForm } from '@components/forms/auth/sign-up'
import { Segment, SegmentedControl } from '@components/ui/segmented-control'

import { PATHS } from '@configs/paths'

export const AuthPage: FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const switchPage = () => {
		if (pathname.includes(PATHS.AUTH.SIGN_UP)) {
			navigate(`/${PATHS.AUTH.SIGN_IN}`, {
				replace: true,
			})
		} else {
			navigate(`/${PATHS.AUTH.SIGN_UP}`, {
				replace: true,
			})
		}
	}

	const formComponent = pathname.includes(PATHS.AUTH.SIGN_UP) ? <SignUpForm /> : <SignInForm />

	return (
		<>
			<Stack
				sx={{ width: '100%' }}
				spacing={2}
				direction='column'
				alignItems='center'
				justifyContent='center'
			>
				<SegmentedControl
					value={pathname.includes(PATHS.AUTH.SIGN_UP) ? 'sign-up' : 'sign-in'}
					onChange={switchPage}
				>
					<Segment value='sign-up' label='Регистрация' />
					<Segment value='sign-in' label='Вход' />
				</SegmentedControl>

				{formComponent}
			</Stack>
		</>
	)
}
