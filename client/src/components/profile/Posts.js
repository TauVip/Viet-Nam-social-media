import { useEffect, useState } from 'react'
import PostThumb from '../PostThumb'

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    profile.userPosts.forEach(data => {
      if (data._id === id) setPosts(data.posts)
    })
  }, [id, profile.userPosts])

  return (
    <div>
      <PostThumb posts={posts} />
    </div>
  )
}
export default Posts
