import { PasswordRecoveryRequest, ResetPassword } from '@/ts/password-recovery.types'

import { apiInstance } from '@api/api.instance'

import { TError, TSuccess } from '@ts/global.types'

export class PasswordRecoveryService {
	private path = '/password-recovery'

	public async requestResetPassword(data: PasswordRecoveryRequest) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/request`, data)
	}

	public async resetPassword(data: ResetPassword) {
		return await apiInstance.post<TError, TSuccess>(`${this.path}/reset`, data)
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
