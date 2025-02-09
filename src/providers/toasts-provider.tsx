import { FC } from 'react'

import { useTheme } from '@mui/material'

import { Toaster } from 'react-hot-toast'

export const ToastsProvider: FC = () => {
	const {
		palette: { mode },
		typography,
	} = useTheme()
	return (
		<Toaster
			position='bottom-right'
			toastOptions={{
				style: {
					backgroundColor: mode === 'light' ? '#fff' : '#333',
					color: mode === 'light' ? '#333' : '#fff',
					fontFamily: typography.fontFamily,
				},
			}}
		/>
	)
}
