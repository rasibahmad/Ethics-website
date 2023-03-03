import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from '../navbar'

const Home = () => {
  const session = useSession();
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  //useEffect(() => {
    //if (session) return;
      //router.push('/login')
  //}, [session])

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home
