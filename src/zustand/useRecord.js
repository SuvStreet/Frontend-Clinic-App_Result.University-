import { create } from 'zustand'
import { URL } from '../constants/url'
import { request } from '../utils'

export const useRecord = create((set, get) => ({
	recordId: '',
	records: [],
	isLoading: false,
	error: null,
	lastPage: 0,
	page: 1,
	sort: 'desc-date',
	search: '',
	limit: 10,
	setSearch: (search) => set({ search }),
	setSort: async (sort) => {
		set({ sort }), await get().fetchRecordsAllAsync({ sort })
	},
	setPage: async (page) => {
		set({ page }), await get().fetchRecordsAllAsync({ page })
	},
	fetchRecordAsync: async ({ name, phone, message }) => {
		const correctPhone = phone.replace(/[^\d+]/g, '')
		set({ error: null, isLoading: true, recordId: '' })

		const data = await request(`${URL.API}`, 'POST', {
			name,
			date: new Date(),
			phone: correctPhone,
			message,
		})

		if (data.error) {
			set({ error: data.error, isLoading: false })

			return
		}

		set({ recordId: data.data.id, error: null, isLoading: false })
	},
	fetchRecordsAllAsync: async () => {
		set({ error: null, isLoading: true, records: [] })

		const data = await request(
			`${URL.API}records?search=${get().search}&page=${get().page}&limit=${
				get().limit
			}&sort=${get().sort}`,
			'GET',
		)

		if (data.error) {
			set({ error: data.error, isLoading: false })
			return
		}

		set({
			records: data.data,
			lastPage: Array.from({ length: data.lastPage }, (_, index) => index + 1),
			isLoading: false,
		})
	},
}))
