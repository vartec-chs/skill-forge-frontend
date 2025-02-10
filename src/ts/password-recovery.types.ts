export type PasswordRecoveryRequest = {
	email: string
}

export type ResetPassword = {
	token: string
	email: string
	newPassword: string
}
