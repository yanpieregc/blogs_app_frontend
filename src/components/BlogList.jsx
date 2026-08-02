import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from './Notification.jsx'

const BlogList = ({ blog }) => {
  // throw new Error('simulaated error')
  return (
    <p><Link to={`/blog/${blog.id}`}>{blog.title} by {blog.author} </Link></p>
  )
} 

export default BlogList