import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { NOTIFY_TYPES } from './redux/actions/notifyAction'
import { POST_TYPES } from './redux/actions/postAction'

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  // joinUser
  useEffect(() => {
    socket.emit('joinUser', auth.user._id)
  }, [auth.user._id, socket])

  // Likes
  useEffect(() => {
    socket.on('likeToClient', newPost =>
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    )

    return () => socket.off('likeToClient')
  }, [dispatch, socket])
  useEffect(() => {
    socket.on('unLikeToClient', newPost =>
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    )

    return () => socket.off('unLikeToClient')
  }, [dispatch, socket])

  // Comments
  useEffect(() => {
    socket.on('createCommentToClient', newPost =>
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    )

    return () => socket.off('createCommentToClient')
  }, [dispatch, socket])
  useEffect(() => {
    socket.on('deleteCommentToClient', newPost =>
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    )

    return () => socket.off('deleteCommentToClient')
  }, [dispatch, socket])

  // Follow
  useEffect(() => {
    socket.on('followToClient', newUser =>
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
    )

    return () => socket.off('followToClient')
  }, [auth, dispatch, socket])
  useEffect(() => {
    socket.on('unFollowToClient', newUser =>
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
    )

    return () => socket.off('unFollowToClient')
  }, [auth, dispatch, socket])

  // Notification
  useEffect(() => {
    socket.on('createNotifyToClient', msg =>
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg })
    )

    return () => socket.off('createNotifyToClient')
  }, [dispatch, socket])
  useEffect(() => {
    socket.on('removeNotifyToClient', msg =>
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg })
    )

    return () => socket.off('removeNotifyToClient')
  }, [dispatch, socket])

  return <></>
}
export default SocketClient
