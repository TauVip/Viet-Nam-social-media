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

function App() {
  const { auth, status } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className='App'>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal />}
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
