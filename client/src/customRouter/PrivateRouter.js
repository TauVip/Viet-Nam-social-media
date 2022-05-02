import { Navigate } from 'react-router-dom'
import PageRender from './PageRender'

const PrivateRouter = () => {
  const firstLogin = localStorage.getItem('firstLogin')

  return firstLogin ? <PageRender /> : <Navigate replace to='/' />
}
export default PrivateRouter
