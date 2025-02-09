import { useState } from 'react'

import { axiosErrorHandler } from '@utils/axios-error-handler'

import { authService } from '@api/services/auth.service'

import type { SignUp } from '@ts/sign-up.types'

type TError = {
	message: string
	statusCode: number
	error: string
}

interface IUseSignUp<T> {
	onSuccess?: (data: T) => void
	onError?: (message: string) => void
}

export const useSignUp = <T>(config?: IUseSignUp<T>) => {
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
