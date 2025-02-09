import { Navigate, Outlet } from 'react-router'

import { useEffect, useState } from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

import { authService } from '@api/services/auth.service'

import { PATHS } from '@configs/paths'

export const PrivateRouteLayout = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await authService.checkAuth() // Серверный эндпоинт для проверки аутентификации
				setIsAuthenticated(true)
			} catch (error) {
				setIsAuthenticated(false)
			}
		}

		checkAuth()
	}, [])

	if (isAuthenticated === null) {
		return (
			<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={true}>
				<CircularProgress color='inherit' />
			</Backdrop>
		)
	}

	return isAuthenticated ? <Outlet /> : <Navigate to={`/${PATHS.AUTH.SIGN_IN}`} replace />
}
