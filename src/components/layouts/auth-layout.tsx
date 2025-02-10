import { Outlet } from 'react-router'

import { FC } from 'react'

import { AppBar, Container, Stack, Typography } from '@mui/material'

import { Brain } from 'lucide-react'

import { ThemeToggle } from '@components/ui/theme-toggle'

export const AuthLayout: FC = () => {
	return (
		<>
			<AppBar
				position='fixed'
				sx={(theme) => ({
					zIndex: theme.zIndex.drawer + 10,
				})}
			>
				<Container maxWidth='xl'>
					<Stack
						spacing={2}
						sx={{ width: '100%', p: 1 }}
						alignItems='center'
						justifyContent='space-between'
						direction='row'
					>
						<Brain width={32} height={32} />
						<Typography variant='h5' fontWeight='bold'>
							SkillForge
						</Typography>

						<ThemeToggle size={32} />
					</Stack>
				</Container>
			</AppBar>

			<Container
				maxWidth='sm'
				sx={{
					height: '100vh',
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
