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

const put = (data) => ({
  method: 'PUT',
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

const updateData = async (id, newObject) => {
  const response = await fetch(`${urlBase}/${id}`, put(newObject))
  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  return data
}

const deleteData = async (id) => {
  const response = await fetch(`${urlBase}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  })

  if (!response.ok) throw ({ status: response.status })
  return null
}

export default { getAll, setToken, createData, updateData, deleteData }