import { useState } from 'react'

const InputComment = ({ children }) => {
  const [content, setContent] = useState('')

  return (
    <form className='card-footer comment_input'>
      {children}
      <input
        type='text'
        placeholder='Add your comments...'
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button type='submit' className='postBtn'>
        Post
      </button>
    </form>
  )
}
export default InputComment
