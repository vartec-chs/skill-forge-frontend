import { Outlet } from 'react-router'

import { FC } from 'react'

import { AppBar, Container, Stack, Typography } from '@mui/material'

import { ThemeToggle } from '@components/ui/theme-toggle'

export const AuthLayout: FC = () => {
	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Stack
						spacing={2}
						sx={{ width: '100%', p: 1 }}
						alignItems='center'
						justifyContent='space-between'
						direction='row'
					>
						<Typography variant='h5' fontWeight='bold'>
							Skill Forge
						</Typography>

						<ThemeToggle />
					</Stack>
				</Container>
			</AppBar>

			<Container
				maxWidth='sm'
				sx={{
					height: '80vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					px: 1,
				}}
				component='main'
			>
				<Stack
					spacing={2}
					sx={{ width: '100%' }}
					alignItems='center'
					justifyContent='center'
					direction='row'
				>
					<Outlet />
				</Stack>
			</Container>
		</>
	)
}
