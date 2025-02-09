import { create } from 'zustand'

import dayjs from 'dayjs'

type SignUpFormState = {
	step: number
	formData: {
		firstName: string
		lastName: string
		surname: string
		dateOfBirth: Date
		gender?: 'Male' | 'Female'
		email: string
		phone?: string
		password: string
		confirmPassword: string
	}
	nextStep: () => void
	prevStep: () => void
	updateFormData: (data: Partial<SignUpFormState['formData']>) => void
	resetFormData: () => void
}

export const useSignUpFormState = create<SignUpFormState>()((set) => ({
	step: 0,
	formData: {
		firstName: '',
		lastName: '',
		surname: '',
		dateOfBirth: dayjs()
			.year(dayjs().year() - 20)
			.startOf('year')
			.toDate(),
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	},
	nextStep: () => set((state) => ({ step: state.step + 1 })),
	prevStep: () => set((state) => ({ step: state.step - 1 })),
	updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
	resetFormData: () =>
		set(() => ({
			formData: {
				firstName: '',
				lastName: '',
				surname: '',
				dateOfBirth: dayjs()
					.year(dayjs().year() - 20)
					.startOf('year')
					.toDate(),
				gender: undefined,
				email: '',
				phone: '',
				password: '',
				confirmPassword: '',
			},
			step: 0,
		})),
}))
