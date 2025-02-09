export type SingInWithPhone = {
	phone: string
	password: string
	twoFactorMailAuthCode?: string
}

export type SingInWithEmail = {
	email: string
	password: string
	twoFactorMailAuthCode?: string
}
