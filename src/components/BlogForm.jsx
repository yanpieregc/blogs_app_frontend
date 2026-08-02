import { useField } from '../hooks/index.js'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate()

  const clearInputs = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value
    })

    if (!title.input.value || !author.input.value || !url.input.value) return

    navigate('/')
    clearInputs()
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form id='blog-form' onSubmit={ addBlog }>
        <TextField id='outlined-basic' variant='outlined' label='title' {...title.input} />
        <TextField id='outlined-basic' variant='outlined' label='author' {...author.input} />
        <TextField id='outlined-basic' variant='outlined' label='url' {...url.input} />
        <div id='blog-form-buttons'>
          <Button variant='contained' type='submit'>create</Button>
          <Button variant='outlined' color='error' type='reset' onClick={clearInputs}>reset</Button>
        </div>
      </form>
    </>
  )
}

export default BlogForm