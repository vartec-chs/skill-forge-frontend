import { PasswordRecoveryRequest } from '@/ts/password-recovery.types'

import { apiInstance } from '@api/api.instance'

import { ConfirmEmail } from '@ts/confirm-email.types'
import { TError, TSuccess } from '@ts/global.types'
import { SingInWithEmail, SingInWithPhone } from '@ts/sign-in.types'
import { SignUp } from '@ts/sign-up.types'

class AuthService {
	private path = '/auth'

	public async signUp(data: SignUp) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/sign-up`, data)
	}

	public async confirmEmail(data: ConfirmEmail) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/confirm-email`, data)
	}

	public async signInWithEmail(data: SingInWithEmail) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/sign-in-with-email`, data)
	}

	public async signInWithPhone(data: SingInWithPhone) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/sign-in-with-phone`, data)
	}

	public async refreshTokens() {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/refresh-tokens`)
	}

	public async signOut() {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/sign-out`)
	}

	public async checkAuth() {
		return await apiInstance.get<TError, TSuccess>(`${this.path}/check-auth`)
	}

	public async requestResetPassword(data: PasswordRecoveryRequest) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/password-recovery/request`, data)
	}
}

export const authService = new AuthService()
