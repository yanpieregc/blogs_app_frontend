import { useField } from '../hooks/index.js'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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

    clearInputs()
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={ addBlog }>
        <p>title <input id='title' {...title.input} /></p>
        <p>author <input id='author' {...author.input} /></p>
        <p>url <input id='url' {...url.input} /></p>
        <button type='submit'>create</button>&emsp;&emsp;
        <button type='reset' onClick={clearInputs}>reset</button>
      </form>
    </>
  )
}

export default BlogForm