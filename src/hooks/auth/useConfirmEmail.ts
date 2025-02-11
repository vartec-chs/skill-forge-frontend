import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { authService } from '@api/services/auth.service'

import type { ConfirmEmail } from '@ts/confirm-email.types'
import { TAuthHook, TError } from '@ts/global.types'

export const useConfirmEmail = <T>(config?: TAuthHook<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<ConfirmEmail | null>(null)

	const confirmEmail = async (data: ConfirmEmail) => {
		setError(null)
		setIsLoading(true)
		await authService
			.confirmEmail(data)
			.then((res) => {
				setData(res.data)
				config?.onSuccess?.(res.data)
			})
			.catch(
				axiosErrorHandler<TError>((res) => {
					if (res.type === 'axios-error') {
						//type is available here
						const error = res.error
						const data = error.response?.data as TError
						setError(data.message)
						config?.onError?.(data.message)
					} else {
						setError(res.error.message)
						config?.onError?.(res.error.message)
					}
				}),
			)
			.finally(() => setIsLoading(false))
	}
	return {
		isLoading,
		error,
		data,
		confirmEmail,
	}
}
