import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'
import PrivateRouter from './customRouter/PrivateRouter'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'
import { getNotifies } from './redux/actions/notifyAction'

function App() {
  const { auth, status, modal } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  return (
    <BrowserRouter>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className={`App ${status || modal ? 'mode' : ''}`}>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}

          <Routes>
            <Route path='/' element={auth.token ? <Home /> : <Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/:page' element={<PrivateRouter />} />
            <Route path='/:page/:id' element={<PrivateRouter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App
