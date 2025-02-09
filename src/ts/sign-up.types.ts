export type SignUp = {
	email: string
	firstName: string
	lastName: string
	surname: string
	dateOfBirth: Date
	gender?: 'Male' | 'Female'
	phone?: string
	password: string
}
