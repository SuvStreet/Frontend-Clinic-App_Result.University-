export const request = async (url, method = 'GET', body = null) => {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		credentials: 'include',
		body: body && JSON.stringify(body),
	})
	const data = await response.json()
	return data
}
