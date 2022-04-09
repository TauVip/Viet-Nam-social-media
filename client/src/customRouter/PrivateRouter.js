import { Navigate } from 'react-router-dom'
import PageRender from './PageRender'

const PrivateRouter = () => {
  const firstLogin = localStorage.getItem('firstLogin')

  return (
    <div className='wrap_page'>
      {firstLogin ? <PageRender /> : <Navigate replace to='/' />}
    </div>
  )
}
export default PrivateRouter
