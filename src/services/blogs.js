const urlBase = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const post = (data) => ({
	method: 'POST',
	headers: {
			'Content-Type': 'application/json',
      'Authorization': token
	},
	body: JSON.stringify(data)
})

const getAll = () => {
	const response = fetch(urlBase)
	return response.then(async res => {
		const data = await res.json()
			if (!res.ok) {
				throw {
					status: res.status,
					data
				}
			}
			return data
	})
}

const createData = async (newObject) => {
	const response = await fetch(urlBase, post(newObject))
  const data = await response.json()
	if (!response.ok) throw new Error(data.error)
  return data
}

export default { getAll, setToken, createData }