import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from '../navbar'

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    //if (session) return;
    //router.push('/login')
  }, [session])

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home
