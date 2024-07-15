import { useRecord } from '../../../../zustand'

export const Sort = () => {
	const { sort, setSort } = useRecord()

	const onChange = ({ target: { value } }) => {
		setSort(value)
	}

	return (
		<select name='sort' className='form-select mb-2' value={sort} onChange={onChange}>
			<option value='desc-name'>Сортировать от Я к А (ФИО)</option>
			<option value='asc-name'>Сортировать от А к Я (ФИО)</option>
			<option value='desc-date'>Сортировать от новых к старым (дата)</option>
			<option value='asc-date'>Сортировать от старых к новым (дата)</option>
		</select>
	)
}
