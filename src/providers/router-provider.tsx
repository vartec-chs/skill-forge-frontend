import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { type FC } from 'react'

import { AuthLayout } from '@components/layouts/auth-layout'
import { PrivateRouteLayout } from '@components/layouts/private-route'
import { RedirectIfAuthenticatedLayout } from '@components/layouts/redirect-If-authenticated'

import { AuthPage } from '@pages/auth'
import { ConfirmEmailPage } from '@pages/auth/confirm-email.page'
import { DashboardPage } from '@pages/dashboard'
import { DocsReadPage } from '@pages/docs-read.page'

import { PATHS } from '@configs/paths'
import { ResetPasswordPage } from '@/pages/auth/reset-password'

export const RouterProvider: FC = () => {

	
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PATHS.HOME} element={<Navigate to={PATHS.AUTH.SIGN_UP} />} />
				<Route element={<AuthLayout />}>
					<Route element={<RedirectIfAuthenticatedLayout />}>
						<Route path={PATHS.AUTH.SIGN_UP} element={<AuthPage />} />
						<Route path={PATHS.AUTH.SIGN_IN} element={<AuthPage />} />
					</Route>

					<Route path={PATHS.AUTH.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
					<Route path={PATHS.AUTH.RESET_PASSWORD} element={<ResetPasswordPage />} />
				</Route>
				<Route path={PATHS.DOCS.READ} element={<DocsReadPage />} />
				<Route element={<PrivateRouteLayout />}>
					<Route path={PATHS.DASHBOARD.ROOT} element={<DashboardPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
