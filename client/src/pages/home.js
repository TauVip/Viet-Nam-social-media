import { useSelector } from 'react-redux'
import Posts from '../components/home/Posts'
import Status from '../components/home/Status'

const Home = () => {
  const { homePost } = useSelector(state => state)

  return (
    <div className='home row mx-0'>
      <div className='col-md-8'>
        <Status />
        <Posts />
      </div>

      <div className='col-md-4'></div>
    </div>
  )
}
export default Home
