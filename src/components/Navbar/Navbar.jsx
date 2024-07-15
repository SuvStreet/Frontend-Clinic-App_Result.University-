import { Link, NavLink, useMatch } from 'react-router-dom'
import { Search } from '../Search/Search'

export const Navbar = () => {
	const isRecordsPage = !!useMatch('/records')

	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Клиника
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/'>
								Главная
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								className={`nav-link ${
									localStorage.getItem('authorization') ? 'disabled' : ''
								}`}
								to='/login'
							>
								Авторизоваться
							</NavLink>
						</li>
						{localStorage.getItem('authorization') && (
							<li className='nav-item'>
								<NavLink className='nav-link' to={'/records'}>
									Записи
								</NavLink>
							</li>
						)}
					</ul>

					{isRecordsPage && <Search placeholder='Поиск по ФИО' />}
				</div>
			</div>
		</nav>
	)
}
