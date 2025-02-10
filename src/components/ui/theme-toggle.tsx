import { FC } from 'react'

import { IconButton } from '@mui/material'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@providers/theme-providers'

interface ThemeToggleProps {
	size?: number
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ size = 24 }) => {
	const { theme, setTheme } = useTheme()

	return (
		<IconButton
			size={'small'}
			color='inherit'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <MoonIcon size={size} /> : <SunIcon size={size} />}
		</IconButton>
	)
}
