import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showAll = () => {
    setVisible(!visible)
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
          <p>{blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </>
      )
    }
  </div>  
  )
}

export default Blog