import { Route, Routes } from 'react-router-dom'

import { Navbar } from './components'
import { Records, Login, Main } from './pages'

function App() {
	return (
		<>
			<div className='container mt-5'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/records' element={<Records />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</div>
		</>
	)
}

export default App
