import { TAuthHook, TError } from '@/ts/global.types'

import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { authService } from '@api/services/auth.service'

import type { SignUp } from '@ts/sign-up.types'

export const useSignUp = <T>(config?: TAuthHook<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<SignUp | null>(null)

	const signUp = async (data: SignUp) => {
		setError(null)
		setIsLoading(true)
		await authService
			.signUp(data)
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
		signUp,
	}
}
