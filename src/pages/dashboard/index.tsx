import type { FC } from 'react'

import { Box, Typography } from '@mui/material'


export const DashboardPage: FC = () => {

	return (
		<Box
			sx={{
				p: 2,
				m: 2,
				maxWidth: 400,
				width: '100%',

				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Typography variant='h5' fontWeight='bold'>
				Добро пожаловать
			</Typography>
		</Box>
	)
}
