import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import BlogList from './components/BlogList.jsx'
import Blog from './components/Blog.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    } catch (error) {
      setNotification({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      throw error
    }
  }

  const addBlog = async (blogObject) => {
    await blogService
      .createData(blogObject)
      .then(returnedBlog => {
        setBlogs(prev => [...prev, returnedBlog])
        setNotification({ text: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        setNotification({ text: error.message, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  const addLikes = async (id, blogObject) => {
    await blogService
      .updateData(id, blogObject)
      .then(updateBlog => {
        setBlogs(blogs => blogs.map(blog => blog.id === id ? updateBlog : blog))
        setNotification({ text: `1 like has been added to the blog ${blogObject.title}`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        setNotification({ text: error.message, type: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if (!window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      return false
    }

    try {
      await blogService.deleteData(id)

      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification({ text: 'Blog remove successfully', type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      return true
    } catch (error) {
      setNotification({ text: error.message, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      return false
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedAppBloglistUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BlogsApp
            </Typography>
            <Button color='inherit' component={Link} to='/' sx={style}>Blogs</Button>
            {
              user !== null && (
                <Button color='inherit' component={Link} to='/create' sx={style}>New Blog</Button>
              )
            }
            
            {
              user === null
                ? <Button type='button' color='inherit' component={Link} to='/login' sx={style}>Login</Button>
                : <Button type='button' variant='contained' color='secondary' onClick={logOut}>logout</Button>
            }
          </Toolbar>
        </AppBar>
      </Box>

      <Notification notification={notification} />

      <Routes>
        <Route path='login' element={
          <LoginForm
            login={handleLogin}
          />
        } />
        
        <Route path='create' element={
          <BlogForm
            createBlog={addBlog}
          />
        } />

        <Route path='/' element={
          <>
            {
              user !== null && (
                <p><strong>{user.name}</strong> is login</p>
              )
            }
            <ErrorBoundary>
              <h1>blogs</h1>
              { [...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <BlogList
                  key={blog.id}
                  updateBlog={addLikes}
                  blog={blog}
                  deleteB={deleteBlog}
                />
              )}
            </ErrorBoundary>
          </>
        } />

        <Route path='/blog/:id' element={
          <Blog user={user} blogs={blogs} updateBlog={addLikes} delBlog={deleteBlog} />
        } />

        <Route path='*' element={
          <h1>404 - Page not found</h1>
        } />

      </Routes>
    </>
  )
}

export default App