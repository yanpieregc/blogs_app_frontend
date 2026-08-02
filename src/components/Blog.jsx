import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Blog = ({ user, blogs, updateBlog, delBlog }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const navigate = useNavigate()

  const addLikes = () => {
    updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const deleteBlog = async () => {
    const deleted = await delBlog(blog.id)

    if (deleted) {
      navigate('/')
    }
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  return (
    <>
      {
        !user && (
          <div className="blog-container">
            <h2>{blog.title}</h2>
            <h3>by {blog.author}</h3>
            <p className="blog-url">{blog.url}</p>
            <p className="blog-user-name">Added by {blog.user.name}</p>
            <p><strong>{blog.likes} likes</strong></p>
          </div>
        )
      }

      {
        user && user.name === blog.user.name 
          ? <div className="blog-container">
              <h2>{blog.title}</h2>
              <h3>by {blog.author}</h3>
              <p className="blog-url">{blog.url}</p>
              <p className="blog-user-name">Added by {blog.user.name}</p>
              <div className='likes-group'>
                <p><strong>{blog.likes} likes</strong></p>
                <Button type="button" variant='contained' onClick={addLikes}>like</Button>
                <Button type='button' variant='contained' color='error' onClick={deleteBlog}>remove</Button>
              </div>
            </div>
          : user && (
              <div className="blog-container">
                <h2>{blog.title}</h2>
                <h3>by {blog.author}</h3>
                <p className="blog-url">{blog.url}</p>
                <p className="blog-user-name">Added by {blog.user.name}</p>
                <div className='likes-group'>
                  <p><strong>{blog.likes} likes</strong></p>
                  <Button variant='contained' type="button" onClick={addLikes}>like</Button>
                </div>
              </div>
            )
      }
    </>
  )
}

export default Blog