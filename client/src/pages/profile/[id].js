import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
  const { profile, auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (profile.ids.every(item => item !== id))
      dispatch(getProfileUsers({ users: profile.users, id, auth }))
  }, [auth, dispatch, id, profile.ids, profile.users])

  return (
    <div className='profile'>
      {profile.loading ? (
        <img className='d-block mx-auto my-4' src={LoadIcon} alt='loading' />
      ) : (
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
    </div>
  )
}
export default Profile
