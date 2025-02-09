import { Navigate, Outlet } from 'react-router'

import { useEffect, useState } from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

import { authService } from '@api/services/auth.service'

import { PATHS } from '@configs/paths'

export const RedirectIfAuthenticatedLayout = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				// Пытаемся выполнить запрос для проверки авторизации (например, проверка токена)
				await authService.checkAuth()
				setIsAuthenticated(true) // Если авторизован
			} catch (error) {
				setIsAuthenticated(false) // Если не авторизован
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

	// Если пользователь авторизован, перенаправляем на главную страницу (например, /dashboard)
	return isAuthenticated ? <Navigate to={`/${PATHS.DASHBOARD.ROOT}`} replace /> : <Outlet />
}
