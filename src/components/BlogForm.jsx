import { useState } from "react"
import Notification from "./Notification.jsx"

const BlogForm = ({ createBlog, successMessage, errorMessage }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const clearInputs = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes('')
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })

    clearInputs()
  }

  return (
  <>
    <Notification className='success' message={successMessage} />
    <Notification className='error' message={errorMessage} />
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