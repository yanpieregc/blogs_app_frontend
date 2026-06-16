const urlBase = '/api/login'

const post = (data) => ({
	method: 'POST',
	headers: {
			'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const login = async credentials => {
  const response = await fetch(urlBase, post(credentials))
  if (!response.ok) throw new Error('Error al iniciar sesion')
  const data = await response.json()
  return data
}

export default { login }