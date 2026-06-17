import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearInputs = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    clearInputs()
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={ addBlog }>
        <p>title <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/></p>
        <p>author <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/></p>
        <p>url <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/></p>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm