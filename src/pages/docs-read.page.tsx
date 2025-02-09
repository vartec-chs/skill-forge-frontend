
import { useParams } from 'react-router'

import { FC } from 'react'

import { Box, Container } from '@mui/material'

export const DocsReadPage: FC = () => {
	const { id } = useParams()
	console.log(id)
	return (
		<Container maxWidth='xl'>
			<Box sx={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
				
			</Box>
		</Container>
	)
}
