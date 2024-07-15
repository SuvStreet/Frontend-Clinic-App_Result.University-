import { create } from 'zustand'
import { request } from '../utils'
import { URL } from '../constants/url'

export const useAuth = create((set) => ({
	email: '',
	isLoading: false,
	error: null,
	fetchUserAsync: async ({ email, password }) => {
		set({ isLoading: true })
		const data = await request(`${URL.API}login`, 'POST', { email, password })

		if (data.error) {
			set({ isLoading: false, error: data.error })
			return
		}

		set({ email: data.data.user, isLoading: false })
		localStorage.setItem('authorization', data.data.user)
	},
	logout: async () => {
		set({ email: '', isLoading: false, error: null })

		const data = await request(`${URL.API}logout`, 'POST')

		if (data.error) {
			set({ error: data.error })
			return
		}

		localStorage.removeItem('authorization')
	},
}))
