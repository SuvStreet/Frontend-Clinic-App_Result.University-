import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputMask } from '@react-input/mask'
import { useRecord } from '../../zustand'

const recordFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Введите ФИО')
		.matches(
			/^([A-Za-zА-Яа-яЁё]+([-'\s]?[A-Za-zА-Яа-яЁё]+)*){1,3}$/,
			'Неверное ФИО. Допускаются только буквы',
		)
		.min(2, 'Имя должно содержать минимум 2 символа')
		.max(50, 'Имя должно содержать максимум 50 символов'),
	phone: yup
		.string()
		.required('Введите номер телефона')
		.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный номер телефона'),
	message: yup
		.string()
		.max(300, 'Описание проблемы должно содержать максимум 300 символов')
		.required('Опишите свою проблему'),
})

export const Main = () => {
	const [serverError, setServerError] = useState(null)
	const { recordId, fetchRecordAsync, isLoading, error } = useRecord()
	const [isSuccess, setIsSuccess] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			message: '',
		},
		resolver: yupResolver(recordFormSchema),
	})

	useEffect(() => {
		if (error) {
			setServerError(error)
		}

		if (!isLoading && !error) {
			reset()
			setIsSuccess(true)

			setTimeout(() => {
				setIsSuccess(false)
			}, 3000)
		}
	}, [isLoading, error, reset])

	const onSubmit = async ({ name, phone, message }) => {
		await fetchRecordAsync({ name, phone, message })
	}

	const formError =
		errors?.name?.message || errors?.phone?.message || errors?.message?.message

	const errorMessage = formError || serverError

	return (
		<div>
			<h1>Запись к врачу</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='border p-3 rounded'>
				<div className='mb-3'>
					<label htmlFor='nameFormControl' className='form-label'>
						ФИО
					</label>
					<input
						type='text'
						className='form-control'
						id='nameFormControl'
						placeholder='Андрей Пупкин Иванович'
						name='name'
						{...register('name', { onChange: () => setServerError(null) })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='phoneFormControl' className='form-label'>
						Номер телефона
					</label>
					<InputMask
						type='text'
						className='form-control'
						id='phoneFormControl'
						mask='+7 (___) ___-__-__'
						replacement={{ _: /\d/ }}
						placeholder='999 999-99-99'
						name='phone'
						{...register('phone', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='messageFormControl' className='form-label'>
						Опишите вашу проблему
					</label>
					<textarea
						className='form-control'
						id='messageFormControl'
						rows='3'
						name='message'
						maxLength='300'
						placeholder='Опишите вашу проблему...'
						{...register('message', { onChange: () => setServerError(null) })}
					></textarea>
				</div>
				<div className='d-flex p-2'>
					<button className='btn btn-primary pt-2 pb-2' disabled={isLoading}>
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

					{!error && recordId && isSuccess && (
						<span className='text-white ms-3 p-2 bg-success flex-grow-1 border border-danger border-danger rounded'>
							Ваша проблема записана, ожидайте звонка
						</span>
					)}
				</div>
			</form>
		</div>
	)
}
