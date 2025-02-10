import { Outlet } from 'react-router'

import { FC } from 'react'

import { AppBar, Box, colors, Container, Stack, Typography } from '@mui/material'

import { Brain } from 'lucide-react'

import { ThemeToggle } from '@components/ui/theme-toggle'

export const AuthLayout: FC = () => {
	return (
		<>
			<Container
				maxWidth='xl'

				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					padding: 1,
				 }}
			>
				<Box
					padding={0.5}
					sx={(theme) => ({
						zIndex: theme.zIndex.drawer + 10,
						backgroundColor:
							theme.palette.mode === 'dark' ? colors.grey[900] : colors.grey[200],
							boxShadow: theme.shadows[2],
					})}
					width='100%'
					borderRadius={4}
				>
					<Stack
						spacing={2}
						sx={{ width: '100%', p: 1 }}
						alignItems='center'
						justifyContent='space-between'
						direction='row'
					>
						<Brain  width={24} height={24} />
						<Typography variant='h5' fontWeight='bold'>
							SkillForge
						</Typography>

						<ThemeToggle size={24} />
					</Stack>
				</Box>
			</Container>

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
