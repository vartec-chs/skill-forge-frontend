export type TError = {
	message: string
	statusCode: number
	error: string
}

export type TSuccess<T = any> = {
	statusCode: number
	message: string
	data: T
}

export type TAuthHook<T = any> = {
	onSuccess?: (data: TSuccess<T>) => void
	onError?: (message: string) => void
}
