import { useRecord } from '../../zustand'

export const Pagination = ({ lastPage, page }) => {
	const { setPage } = useRecord()

	return (
		<nav aria-label='Page navigation' className='d-flex justify-content-center'>
			<ul className='pagination'>
				{lastPage.map((el) => (
					<li
						key={el}
						className={`page-item ${page === el ? 'active' : ''}`}
						aria-current='page'
						onClick={() => setPage(el)}
						style={{ cursor: 'pointer' }}
					>
						<a className='page-link'>{el}</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
