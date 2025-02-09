import { PATHS } from '@/configs/paths'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { authService } from './services/auth.service'

export const apiInstance = axios.create({
	baseURL: import.meta.env.VITE_BECKEND_URL + '/api/v1/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

let isRefreshing = false // Флаг, чтобы избежать повторных запросов
let refreshSubscribers: Array<(config: AxiosRequestConfig) => void> = [] // Очередь запросов, ожидающих новый токен

const onRefreshed = () => {
	refreshSubscribers.forEach((callback) => callback({}))
	refreshSubscribers = []
}



apiInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

		const status = error.response?.status

		// Обработка 404 - не повторяем запрос
		if (status === 404) {
			console.error('Ошибка 404: ресурс не найден', error.config.url)
			return Promise.reject(error)
		}

		// Обработка 403 - нет прав доступа
		if (status === 403) {
			console.error('Ошибка 403: доступ запрещен', error.config.url)
			return Promise.reject(error)
		}

		// Обработка 429 - слишком много запросов (можно добавить задержку перед повтором)
		if (status === 429) {
			console.warn('Ошибка 429: слишком много запросов, ждем перед повтором')
			await new Promise((resolve) => setTimeout(resolve, 3000)) // Ждем 3 секунды
			return apiInstance(originalRequest) // Пробуем заново
		}

		// Обработка 401 - попытка обновить токен
		if (status === 401 && !originalRequest._retry) {
			console.log('Ошибка 401: неавторизованный запрос')
			if (isRefreshing) {
				return new Promise((resolve) => {
					refreshSubscribers.push((config) => {
						originalRequest._retry = true
						resolve(apiInstance({ ...originalRequest, ...config }))
					})
				})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				console.log('Пытаемся обновить токен')
				await authService.refreshTokens()
				console.log('Токен обновлен')

				isRefreshing = false
				onRefreshed()

				return apiInstance(originalRequest)
			} catch (refreshError) {
				isRefreshing = false
				refreshSubscribers = []
				console.error('Ошибка обновления токена:', refreshError)
				// window.location.href = `/${PATHS.AUTH.SIGN_IN}`
				return Promise.reject(refreshError)
			}
		}

		// Все другие ошибки (500, 502, 503 и т. д.) - логируем и просто отклоняем
		console.error(`Ошибка ${status}:`, error.config.url, error.response?.data || error.message)

		return Promise.reject(error)
	},
)
