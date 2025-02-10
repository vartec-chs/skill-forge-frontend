import { useCallback, useEffect, useState } from 'react'

import { axiosErrorHandler } from '@/utils/axios-error-handler'
import axios, { AxiosResponse } from 'axios'

type TError = {
	message: string
	statusCode: number
	error: string
}

type TSuccess<T = any> = {
	statusCode: number
	message: string
	data: T
}

type TConfig<T = any> = {
	promise: Promise<AxiosResponse<TSuccess<T>>>
	isEffect?: boolean
	onSuccess?: (res: TSuccess<T>) => void
	onError?: (error: string) => void
	onFinally?: () => void
}

export const useAxios = <T>(config?: TConfig<T>) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [data, setData] = useState<TSuccess<T> | null>(null)

	const makeRequest = useCallback(
		async (config: TConfig<T>) => {
			setError(null)
			setIsLoading(true)
			await config.promise
				.then((res) => {
					setData(res.data)
					config.onSuccess?.(res.data)
				})
				.catch(axiosErrorHandler<TError>((res) => {
					if (res.type === 'axios-error') {
						
						const error = res.error
						if (error.code === 'ERR_NETWORK') {
							setError('Ошибка сети')
							config.onError?.('Ошибка сети')
						}
						const data = error.response?.data as TError
						setError(data.message)
						config.onError?.(data.message)
					} else {
						setError(res.error.message)
						config.onError?.(res.error.message)
					}
				}))
				.finally(() => setIsLoading(false))
		},
		[],
	)

	useEffect(() => {
		if (!config?.isEffect) return
		makeRequest(config)
	}, [config?.isEffect])

	return { isLoading, error, data, makeRequest }
}
