import { useState, useEffect } from 'react'
import Blog from './components/Blog.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedAppBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    await blogService
      .createData(blogObject)
        .then(returnedBlog => {
          setBlogs(prev => [...prev, returnedBlog])
          setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedAppBloglistUser')
    setUser(null)
  }

  return (
    <>
      <h1>blogs</h1>
      {user === null && (
        <Togglable buttonLabel='login'>
          <LoginForm 
            login={handleLogin}
            errorMessage={errorMessage}
          />
        </Togglable>
      )}
      {user !== null && (
        <>
          <p>{user.name} logged in <button onClick={() => logOut()}>log out</button></p>
          <Togglable buttonLabel='new blog'>
            <BlogForm
              createBlog={addBlog}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          </Togglable>
        </>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App