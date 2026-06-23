import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username)

    login({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <p>username <input id='username' type="text" value={username} onChange={({ target }) => setUsername(target.value)}/></p>
        <p>password <input id='password' type="password" value={password} onChange={({ target }) => setPassword(target.value)}/></p>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm