
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  return (
    <section className='flex justify-center items-center'>
      <div className='container'>
        <Button onClick={() => { navigate(`/signin`) }}>
          Proceed to Sign-In
        </Button>
      </div>
    </section>
  )
}

export default Home