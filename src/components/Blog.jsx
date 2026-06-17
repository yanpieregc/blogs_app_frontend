import { useState } from 'react'
import Notification from './Notification.jsx'

const Blog = ({ updateBlog, blog, deleteB }) => {
  const [visible, setVisible] = useState(false)

  const showAll = () => {
    setVisible(!visible)
  }

  const addLikes = () => {
    updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const deleteBlog = () => {
    deleteB(blog.id)
  }

  return (
    <div className="blog">
      {
        !visible && (
          <p>{blog.title} --- {blog.author} <button onClick={showAll}>view</button></p>
        )
      }
      {
        visible && (
          <>
            <p>{blog.title} --- {blog.author} <button onClick={showAll}>hide</button></p>
            <p>{blog.url}</p>
            <p>{blog.likes} <button type="button" className="btnLike" onClick={addLikes}>like</button></p>
            <p>{blog.user.name}</p>
            <button className="btnRemove" onClick={deleteBlog}>remove</button>
          </>
        )
      }
    </div>
  )
}

export default Blog