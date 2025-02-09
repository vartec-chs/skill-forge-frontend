import { FC } from 'react'

import { IconButton } from '@mui/material'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@providers/theme-providers'

export const ThemeToggle: FC = () => {
	const { theme, setTheme } = useTheme()

	return (
		<IconButton size='small' color='inherit' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			{theme === 'light' ? <MoonIcon /> : <SunIcon />}
		</IconButton>
	)
}
