import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { passwordRecoveryService } from '@api/services/password-recovery.service'

import { TAuthHook, TError } from '@ts/global.types'
import type { ResetPassword } from '@ts/password-recovery.types'

interface IResetPassword<T> extends TAuthHook<T> {
	onError?: (message: string | TError) => void
}

export const useResetPassword = <T>(config?: IResetPassword<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<TError | string | null>(null)
	const [data, setData] = useState<T | null>(null)

	const resetPassword = async (data: ResetPassword) => {
		setError(null)
		setIsLoading(true)
		await passwordRecoveryService
			.resetPassword(data)
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
						config?.onError?.(data)
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
		resetPassword,
	}
}
