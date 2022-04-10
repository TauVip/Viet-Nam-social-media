import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { addUser } from '../../redux/actions/messageAction'
import { getDataAPI } from '../../utils/fetchData'
import UserCard from '../UserCard'

const LeftSide = () => {
  const { auth, message } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  const handleSearch = async e => {
    e.preventDefault()
    if (!search) return setSearchUsers([])

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token)
      setSearchUsers(res.data.users)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg }
      })
    }
  }

  const handleAddUser = user => {
    setSearch('')
    setSearchUsers([])
    dispatch(addUser({ user, message }))
    return navigate(`/message/${user._id}`)
  }

  return (
    <>
      <form className='message_header' onClick={handleSearch}>
        <input
          type='text'
          value={search}
          placeholder='Enter to Search...'
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit' style={{ display: 'none' }}>
          Search
        </button>
      </form>

      <div className='message_chat_list'>
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map(user => (
              <div
                key={user._id}
                className='message_user'
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map(user => (
              <div
                key={user._id}
                className='message_user'
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user}>
                  <i className='fas fa-circle' />
                </UserCard>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
export default LeftSide
