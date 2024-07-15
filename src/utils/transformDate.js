export const transformDate = (date) => {
	return new Date(date).toLocaleString('ru-RU', {
		timeZone: 'UTC',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}
