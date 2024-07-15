import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useRecord } from '../../zustand'
import { Pagination } from '../../components/Pagination/Pagination'
import { Sort } from './components/Sort/Sort'
import { transformDate } from '../../utils'

export const Records = () => {
	const {
		records,
		fetchRecordsAllAsync,
		isLoading,
		lastPage,
		page,
	} = useRecord()
	const { logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('authorization')) {
			navigate('/login')
		}

		fetchRecordsAllAsync()
	}, [fetchRecordsAllAsync, navigate ])

	const handelLogout = async () => {
		await logout()
		navigate('/login')
	}

	return (
		<div>
			<div className='container mt-5 d-flex justify-content-between align-items-center'>
				<h1>Заявки с формы</h1>
				<button className='btn btn-danger h-50' onClick={handelLogout}>
					Выход
				</button>
			</div>

			<Sort />

			<table className='table table-striped table-bordered'>
				<caption>
					Последнее обновление {new Date().toLocaleString('ru-RU')}. Врач:{' '}
					{localStorage.getItem('authorization')}
				</caption>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Дата отправки</th>
						<th scope='col'>ФИО</th>
						<th scope='col'>Телефон</th>
						<th scope='col'>Проблема</th>
					</tr>
				</thead>
				<tbody className='table-group-divider'>
					{isLoading ? (
						<tr>
							<td colSpan={5} className='text-center'>
								<div className='spinner-border text-secondary' role='status'>
									<span className='visually-hidden'>Загрузка...</span>
								</div>
							</td>
						</tr>
					) : records.length === 0 ? (
						<tr>
							<td colSpan={5} className='text-center'>
								Мы не нашли ни одной записи, сегодня вы свободны
							</td>
						</tr>
					) : (
						records.map((record, index) => {
							return (
								<tr key={record.id}>
									<th scope='row'>{index + 1}</th>
									<td>
										{transformDate(record.date)}
									</td>
									<td>{record.name}</td>
									<td>{record.phone}</td>
									<td>{record.message}</td>
								</tr>
							)
						})
					)}
				</tbody>
			</table>

			{lastPage <= 1 ? null : <Pagination lastPage={lastPage} page={page} />}
		</div>
	)
}
