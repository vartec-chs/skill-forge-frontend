import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { TAuthHook, TError } from '@ts/global.types'
import type { PasswordRecoveryRequest } from '@ts/password-recovery.types'
import { passwordRecoveryService } from '@/api/services/password-recovery.service'

export const useRequestResetPassword = <T>(config?: TAuthHook<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<T | null>(null)

	const requestResetPassword = async (data: PasswordRecoveryRequest) => {
		setError(null)
		setIsLoading(true)
		await passwordRecoveryService
			.requestResetPassword(data)
			.then((res) => {
				setData(res.data)
				config?.onSuccess?.(res.data)
			})
			.catch(
				axiosErrorHandler<TError>((res) => {
					if (res.type === 'axios-error') {
						//type is available here
						const error = res.error
						if (error.code === 'ERR_NETWORK') {
							setError('Network error')
							config?.onError?.('Network error')
						}
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
		requestResetPassword,
	}
}
