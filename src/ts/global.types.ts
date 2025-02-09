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
