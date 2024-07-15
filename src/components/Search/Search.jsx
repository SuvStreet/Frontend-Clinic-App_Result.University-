import { useEffect, useState } from 'react'
import PropsTypes from 'prop-types'

import { useRecord } from '../../zustand'
import { useDebounce } from '../../hooks'

export const Search = ({ placeholder }) => {
	const { search, setSearch, fetchRecordsAllAsync } = useRecord()
	const [isClickedSearch, setIsClickedSearch] = useState(true)

	const debouncedSearch = useDebounce(search, 2000)

	useEffect(() => {
		if (isClickedSearch) return
		fetchRecordsAllAsync({ search: debouncedSearch })
	}, [debouncedSearch, fetchRecordsAllAsync])

	const onChange = ({ target: { value } }) => {
		setIsClickedSearch(false)
		setSearch(value)
	}

	const handleSubmitSearch = (e) => {
		e.preventDefault()
		fetchRecordsAllAsync({ search })
		setIsClickedSearch(true)
	}

	return (
		<form className='d-flex' role='search'>
			<input
				className='form-control me-2'
				type='search'
				placeholder={placeholder}
				aria-label='Search'
				value={search}
				onChange={onChange}
			/>
			<button
				className='btn btn-outline-success'
				type='submit'
				onClick={handleSubmitSearch}
			>
				Поиск
			</button>
		</form>
	)
}

Search.propTypes = {
	placeholder: PropsTypes.string,
	searchPhrase: PropsTypes.string,
}
