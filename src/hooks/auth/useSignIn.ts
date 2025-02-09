import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { authService } from '@api/services/auth.service'

import type { SingInWithEmail, SingInWithPhone } from '@ts/sign-in.types'

type TError = {
	message: string
	statusCode: number
	error: string
}

interface IUseSignIn<T = any> {
	onSuccess?: (data: T) => void
	onError?: (message: string) => void
}

export const useSignIn = <T>(config?: IUseSignIn<T>) => {
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
