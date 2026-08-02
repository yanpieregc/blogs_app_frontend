import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({
      username: username,
      password: password
    })

      navigate('/')
      setUsername('')
      setPassword('')
    } catch (error) {
    }
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form id='login-form' onSubmit={handleLogin}>
        <TextField id='outlined-basic' label='username' variant='outlined' type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
        <TextField id='outlined-basic' label='password' variant='outlined' type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        <Button variant='contained' type='submit'>Login</Button>
      </form>
    </>
  )
}

export default LoginForm