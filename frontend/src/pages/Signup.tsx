import { Quote } from '../components/Quote'
import Auth from '../components/Auth'
const Signup = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='col-span-1'><Auth type="signup" /></div>
        <div className='col-span-1 invisible lg:visible'><Quote /></div>
    </div>
  )
}

export default Signup
