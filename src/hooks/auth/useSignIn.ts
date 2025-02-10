import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { authService } from '@api/services/auth.service'

import type { SingInWithEmail, SingInWithPhone } from '@ts/sign-in.types'
import { TAuthHook } from '@/ts/global.types'

type TError = {
	message: string
	statusCode: number
	error: string
}



export const useSignIn = <T>(config?: TAuthHook<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<SingInWithEmail | SingInWithPhone | null>(null)

	const signInWithEmail = async (data: SingInWithEmail) => {
		setError(null)
		setIsLoading(true)
		await authService
			.signInWithEmail(data)
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
						console.log(`res.error:`, res)
						setError(res.error.message)
						config?.onError?.(res.error.message)
					}
				}),
			)
			.finally(() => setIsLoading(false))
	}

	const signInWithPhone = async (data: SingInWithPhone) => {
		setError(null)
		setIsLoading(true)
		await authService
			.signInWithPhone(data)
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
		signInWithEmail,
		signInWithPhone,
	}
}
