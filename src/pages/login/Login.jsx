import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useAuth } from '../../zustand/useAuth'
import { useNavigate } from 'react-router-dom'

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Введите электронную почту')
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректная электронная почта'),
	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.matches(/^[A-Za-zА-Яа-я0-9]+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min('4', 'Неверный логин. Минимальная длина логина - 4 символа')
		.max('15', 'Неверный логин. Максимальная длина логина - 15 символов'),
})

export const Login = () => {
	const [serverError, setServerError] = useState(null)
	const {fetchUserAsync, isLoading, error} = useAuth()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	useEffect(() => {
		if (localStorage.getItem('authorization')) {
			navigate('/records')
		}
	}, [navigate, isLoading, error])

	const onSubmit = ({ email, password }) => {
		fetchUserAsync({ email, password })
	}

	const formError = errors?.email?.message || errors?.password?.message

	const errorMessage = formError || serverError

	return (
		<div>
			<h1>Авторизация</h1>
			<form action='' className='border p-3 rounded' onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-3'>
					<label htmlFor='emailFormControl' className='form-label'>
						Электронная почта
					</label>
					<input
						name='email'
						type='email'
						className='form-control'
						id='emailFormControl'
						placeholder='4G5vM@example.com'
						{...register('email', { onChange: () => setServerError(null) })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='passwordFormControl' className='form-label'>
						Пароль
					</label>
					<input
						name='password'
						type='password'
						className='form-control'
						id='passwordFormControl'
						placeholder='Пароль...'
						{...register('password', { onChange: () => setServerError(null) })}
					/>
				</div>
				<div className='d-flex p-2'>
					<button type='submit' className='btn btn-primary pt-2 pb-2'>
						{isLoading ? (
							<>
								<span
									className='spinner-border spinner-border-sm me-2'
									aria-hidden='true'
								></span>
								<span role='status'>Загрузка...</span>
							</>
						) : (
							'Отправить'
						)}
					</button>
					{errorMessage && (
						<span className='text-white ms-3 p-2 bg-danger flex-grow-1 border border-danger border-danger rounded'>
							{errorMessage}
						</span>
					)}
				</div>
			</form>
		</div>
	)
}
